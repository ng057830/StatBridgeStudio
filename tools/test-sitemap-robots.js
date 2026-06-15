const https = require('https');
const url = require('url');

function getUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(targetUrl);
    https.get({
      protocol: parsed.protocol,
      host: parsed.host,
      path: parsed.path,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          contentType: res.headers['content-type'],
          headers: res.headers,
          data: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('--- VERIFYING ROBOTS.TXT ---');
  try {
    const res = await getUrl('https://statbridgestudio.com/robots.txt');
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${res.contentType}`);
    console.log('Content:\n' + res.data);
    
    if (res.status !== 200) {
      console.error('ERROR: robots.txt did not return 200');
    }
    if (!res.data.includes('Sitemap: https://statbridgestudio.com/sitemap.xml')) {
      console.error('ERROR: robots.txt does not contain Sitemap reference');
    }
  } catch (e) {
    console.error('ERROR fetching robots.txt:', e.message);
  }

  console.log('\n--- VERIFYING SITEMAP.XML ---');
  try {
    const res = await getUrl('https://statbridgestudio.com/sitemap.xml');
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${res.contentType}`);
    
    if (res.status !== 200) {
      console.error('ERROR: sitemap.xml did not return 200');
    }
    
    // Parse URLs using regex
    const locMatches = [...res.data.matchAll(/<loc>(https:\/\/statbridgestudio\.com\/[^<]*)<\/loc>/gi)];
    const urls = locMatches.map(m => m[1]);
    console.log(`Found ${urls.length} URLs in sitemap.`);
    
    if (urls.includes('https://statbridgestudio.com/thank-you.html')) {
      console.error('ERROR: thank-you.html is included in sitemap.xml!');
    } else {
      console.log('SUCCESS: thank-you.html is correctly excluded from sitemap.xml');
    }
    
    // Test each URL
    for (const u of urls) {
      console.log(`Checking sitemap URL: ${u}`);
      const uRes = await getUrl(u);
      console.log(`  -> Status: ${uRes.status}`);
      if (uRes.status !== 200) {
        console.error(`  -> ERROR: URL returned status ${uRes.status}`);
      }
      
      // Check canonical tag in content
      const canonicalMatch = uRes.data.match(/<link\s+rel=["']canonical["']\s+href=["']([^]*?)["']\s*\/?>/i);
      const canonical = canonicalMatch ? canonicalMatch[1].trim() : 'NOT FOUND';
      console.log(`  -> Canonical tag: ${canonical}`);
      
      // Compare
      let expectedCanonical = u;
      if (u === 'https://statbridgestudio.com/') {
        // Allow home canonical with or without trailing slash
        if (canonical !== 'https://statbridgestudio.com/' && canonical !== 'https://statbridgestudio.com') {
          console.error(`  -> ERROR: Canonical mismatch. Expected: https://statbridgestudio.com/, Got: ${canonical}`);
        }
      } else if (canonical !== expectedCanonical) {
        console.error(`  -> ERROR: Canonical mismatch. Expected: ${expectedCanonical}, Got: ${canonical}`);
      }
      
      // Check robots meta
      const robotsMatch = uRes.data.match(/<meta\s+name=["']robots["']\s+content=["']([^]*?)["']\s*\/?>/i);
      const robots = robotsMatch ? robotsMatch[1].trim() : 'NONE';
      console.log(`  -> Robots meta: ${robots}`);
      if (robots !== 'NONE' && !robots.includes('index')) {
        console.warn(`  -> WARNING: URL is in sitemap but has robots directive: ${robots}`);
      }
    }
  } catch (e) {
    console.error('ERROR fetching sitemap.xml:', e.message);
  }
}

run();
