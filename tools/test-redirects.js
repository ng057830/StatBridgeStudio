const http = require('http');
const https = require('https');
const url = require('url');

function testUrl(targetUrl, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    
    console.log(`Testing: ${targetUrl}`);
    const req = client.request({
      method: 'GET',
      protocol: parsed.protocol,
      host: parsed.host,
      path: parsed.path,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      console.log(`  -> Status: ${res.statusCode}`);
      console.log(`  -> Headers:`, {
        location: res.headers.location,
        'content-type': res.headers['content-type']
      });
      
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = url.resolve(targetUrl, res.headers.location);
        if (maxRedirects > 0) {
          resolve(testUrl(redirectUrl, maxRedirects - 1));
        } else {
          reject(new Error('Too many redirects'));
        }
      } else {
        resolve({ finalUrl: targetUrl, status: res.statusCode, contentType: res.headers['content-type'] });
      }
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
}

async function run() {
  const urls = [
    'http://statbridgestudio.com/',
    'http://www.statbridgestudio.com/',
    'https://www.statbridgestudio.com/',
    'https://statbridgestudio.com/'
  ];
  
  for (const u of urls) {
    try {
      const result = await testUrl(u);
      console.log(`RESULT: ${u} ended at ${result.finalUrl} with status ${result.status} [${result.contentType}]\n`);
    } catch (e) {
      console.error(`ERROR for ${u}:`, e.message, '\n');
    }
  }
}

run();
