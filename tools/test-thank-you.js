const https = require('https');

https.get('https://statbridgestudio.com/thank-you.html', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["']([^]*?)["']\s*\/?>/i);
    const robotsMatch = data.match(/<meta\s+name=["']robots["']\s+content=["']([^]*?)["']\s*\/?>/i);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');
    console.log('Robots Meta:', robotsMatch ? robotsMatch[1] : 'NOT FOUND');
  });
}).on('error', (e) => {
  console.error(e.message);
});
