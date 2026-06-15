const fs = require('fs');
const path = require('path');

function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error('Not a valid JPEG file');
  }
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    if (marker === 0xffd9) {
      // EOI (End of Image)
      break;
    }
    if (marker >= 0xffc0 && marker <= 0xffc3) {
      // SOF0, SOF1, SOF2, SOF3
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    // Read segment length and skip
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  throw new Error('SOF marker not found');
}

try {
  const dim = getJpegDimensions(path.resolve(__dirname, '../assets/images/favicon-logo.png'));
  console.log('favicon-logo.png dimensions:', dim.width, 'x', dim.height);
} catch (e) {
  console.error(e.message);
}
