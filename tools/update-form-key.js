const fs = require('fs');
const path = require('path');

const indexFile = path.resolve(__dirname, '../index.html');
let content = fs.readFileSync(indexFile, 'utf8');

const oldKey = '401af540-d626-4642-b6c7-4ad5344d9a63';
const newKey = '946652bf-632e-4a49-8ba7-1bc61256f699';

// Check if old key is present
if (!content.includes(oldKey)) {
  console.error(`Error: Old key ${oldKey} not found in index.html`);
  process.exit(1);
}

// Replacements
content = content.replace(oldKey, newKey);
content = content.replace("subject: 'New Quote Request',", "subject: 'New Quote Request - StatBridge Studio',");
content = content.replace("hiddenPlanInput.value = 'no-lo-se';", "hiddenPlanInput.value = 'General quote request';");
content = content.replace('const selectedPackage = document.getElementById("selected_plan").value || "no-lo-se";', 'const selectedPackage = document.getElementById("selected_plan").value || "General quote request";');

fs.writeFileSync(indexFile, content, 'utf8');
console.log('Successfully updated access key, subject, and default selected_plan in index.html');
