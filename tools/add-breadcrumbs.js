const fs = require('fs');
const path = require('path');

const servicePages = [
  {
    file: 'survey-data-analysis.html',
    name: 'Survey Data Analysis'
  },
  {
    file: 'spss-data-analysis.html',
    name: 'SPSS Data Analysis'
  },
  {
    file: 'thesis-statistical-analysis.html',
    name: 'Thesis & Dissertation Support'
  },
  {
    file: 'likert-scale-analysis.html',
    name: 'Likert Scale Analysis'
  },
  {
    file: 'r-python-statistical-analysis.html',
    name: 'R & Python Analysis'
  }
];

servicePages.forEach(sp => {
  const filePath = path.resolve(__dirname, '..', sp.file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${sp.file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match the container, the inner div, and the badge span
  const regex = /(<div class="container hero-content" style="[^"]*">\s*<div>\s*)(<span class="badge">)/;
  
  if (regex.test(content)) {
    const breadcrumbHtml = `<nav class="breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.78rem; color: rgba(255,255,255,0.65); margin-bottom: 0.75rem; display: flex; gap: 0.4rem; align-items: center;"><a href="index.html" style="color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s;">Home</a> <span style="color: rgba(255,255,255,0.4);">&gt;</span> <span style="color: rgba(255,255,255,0.5);">${sp.name}</span></nav>\n          `;
    content = content.replace(regex, `$1${breadcrumbHtml}$2`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully added breadcrumb to ${sp.file}`);
  } else {
    console.warn(`Could not match hero badge pattern in ${sp.file}`);
  }
});
