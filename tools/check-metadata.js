const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const files = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(ROOT_DIR, f);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`=== ${f} ===`);
  
  // Extract Title
  const titleMatch = content.match(/<title>([^]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'MISSING';
  
  // Extract Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^]*?)["']\s*\/?>/i) ||
                    content.match(/<meta\s+content=["']([^]*?)["']\s+name=["']description["']\s*\/?>/i);
  const desc = descMatch ? descMatch[1].trim() : 'MISSING';
  
  // Extract Canonical
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^]*?)["']\s*\/?>/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : 'MISSING';
  
  // Extract Open Graph Url
  const ogUrlMatch = content.match(/<meta\s+property=["']og:url["']\s+content=["']([^]*?)["']\s*\/?>/i);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1].trim() : 'MISSING';

  // Extract Open Graph Image
  const ogImageMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^]*?)["']\s*\/?>/i);
  const ogImage = ogImageMatch ? ogImageMatch[1].trim() : 'MISSING';

  // Extract Open Graph Title
  const ogTitleMatch = content.match(/<meta\s+property=["']og:title["']\s+content=["']([^]*?)["']\s*\/?>/i);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : 'MISSING';

  // Extract Open Graph Site Name
  const ogSiteNameMatch = content.match(/<meta\s+property=["']og:site_name["']\s+content=["']([^]*?)["']\s*\/?>/i);
  const ogSiteName = ogSiteNameMatch ? ogSiteNameMatch[1].trim() : 'MISSING';

  // Extract Twitter Card
  const twitterCardMatch = content.match(/<meta\s+property=["']twitter:card["']\s+content=["']([^]*?)["']\s*\/?>/i) ||
                           content.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^]*?)["']\s*\/?>/i);
  const twitterCard = twitterCardMatch ? twitterCardMatch[1].trim() : 'MISSING';

  // Count script tags with application/ld+json
  const schemaCount = (content.match(/<script\s+type=["']application\/ld\+json["']/gi) || []).length;
  
  console.log(`  Title:        ${title}`);
  console.log(`  Description:  ${desc}`);
  console.log(`  Canonical:    ${canonical}`);
  console.log(`  OG Title:     ${ogTitle}`);
  console.log(`  OG Url:       ${ogUrl}`);
  console.log(`  OG Image:     ${ogImage}`);
  console.log(`  OG Site Name: ${ogSiteName}`);
  console.log(`  Twitter Card: ${twitterCard}`);
  console.log(`  JSON-LD Count:${schemaCount}`);
  console.log('');
});
