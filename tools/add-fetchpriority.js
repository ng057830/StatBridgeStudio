const fs = require('fs');
const path = require('path');

const servicePages = [
  'survey-data-analysis.html',
  'spss-data-analysis.html',
  'thesis-statistical-analysis.html',
  'likert-scale-analysis.html',
  'r-python-statistical-analysis.html'
];

servicePages.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match the hero image tag ending with width="1024" height="1024" decoding="async"
  const targetTag = /width="1024" height="1024" decoding="async">/g;
  
  if (content.match(targetTag)) {
    content = content.replace(targetTag, 'width="1024" height="1024" decoding="async" fetchpriority="high">');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully added fetchpriority="high" to ${file}`);
  } else {
    console.warn(`Could not match LCP image pattern in ${file}`);
  }
});
