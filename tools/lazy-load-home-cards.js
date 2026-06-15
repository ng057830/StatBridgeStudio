const fs = require('fs');
const path = require('path');

const indexFile = path.resolve(__dirname, '../index.html');
let content = fs.readFileSync(indexFile, 'utf8');

const targets = [
  {
    old: '<img src="./assets/images/survey-analysis-ill.png" alt="Survey Data Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/survey-analysis-ill.png" alt="Survey Data Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  },
  {
    old: '<img src="./assets/images/spss-analysis-ill.png" alt="SPSS Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/spss-analysis-ill.png" alt="SPSS Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  },
  {
    old: '<img src="./assets/images/r-python-analysis-ill.png" alt="R / Python Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/r-python-analysis-ill.png" alt="R / Python Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  },
  {
    old: '<img src="./assets/images/likert-analysis-ill.png" alt="Likert Scale Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/likert-analysis-ill.png" alt="Likert Scale Analysis" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  },
  {
    old: '<img src="./assets/images/thesis-analysis-ill.png" alt="Thesis & Dissertation Statistics" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/thesis-analysis-ill.png" alt="Thesis & Dissertation Statistics" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  },
  {
    old: '<img src="./assets/images/data-cleaning-ill.png" alt="Excel / CSV Data Cleaning" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);">',
    new: '<img src="./assets/images/data-cleaning-ill.png" alt="Excel / CSV Data Cleaning" style="width: 100%; height: 100%; object-fit: cover; display: block; border-bottom: 1px solid var(--clr-border);" width="1024" height="1024" loading="lazy" decoding="async">'
  }
];

let replacedCount = 0;
targets.forEach(t => {
  if (content.includes(t.old)) {
    content = content.replace(t.old, t.new);
    replacedCount++;
  } else {
    console.warn(`Warning: Target not found for: ${t.old.substring(0, 80)}...`);
  }
});

fs.writeFileSync(indexFile, content, 'utf8');
console.log(`Successfully replaced ${replacedCount} image tags in index.html with lazy loading and dimensions.`);
