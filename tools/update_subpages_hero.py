import os
import re

files_mapping = {
    'survey-data-analysis.html': ('survey-analysis-ill.png', 'Survey Analysis Illustration'),
    'spss-data-analysis.html': ('spss-analysis-ill.png', 'SPSS Analysis Illustration'),
    'thesis-statistical-analysis.html': ('thesis-analysis-ill.png', 'Thesis Analysis Illustration'),
    'likert-scale-analysis.html': ('likert-analysis-ill.png', 'Likert Scale Analysis Illustration'),
    'r-python-statistical-analysis.html': ('r-python-analysis-ill.png', 'R and Python Scripting Illustration')
}

pattern = re.compile(
    r'<div class="container hero-content">[\s\n]*'
    r'<span class="badge">([\s\S]*?)</span>[\s\n]*'
    r'<h1 class="hero-title"[\s\S]*?>([\s\S]*?)</h1>[\s\n]*'
    r'<p class="hero-desc"[\s\S]*?>([\s\S]*?)</p>[\s\n]*'
    r'<div class="hero-btns">([\s\S]*?)</div>[\s\n]*'
    r'</div>',
    re.MULTILINE
)

for filename, (img_name, alt_text) in files_mapping.items():
    if not os.path.exists(filename):
        print(f"Skipping {filename} (not found)")
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    match = pattern.search(content)
    if not match:
        print(f"Error: Hero structure not matched in {filename}")
        continue
        
    badge = match.group(1).strip()
    title = match.group(2).strip()
    desc = match.group(3).strip()
    btns = match.group(4).strip()
    
    # Format buttons to have standard indentation
    btns_indented = "\n            ".join([line.strip() for line in btns.split('\n') if line.strip()])
    
    new_hero_content = f'''<div class="container hero-content" style="max-width: 1000px; display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; text-align: left;">
        <div>
          <span class="badge">{badge}</span>
          <h1 class="hero-title" style="font-size: 2.25rem; color: #fff; line-height: 1.2; margin-bottom: 1rem;">{title}</h1>
          <p class="hero-desc" style="font-size: 1rem; color: rgba(255,255,255,0.75); margin-top: 1rem; margin-bottom: 2rem; max-width: none; text-align: left; margin-left: 0; margin-right: 0;">
            {desc}
          </p>
          <div class="hero-btns" style="justify-content: flex-start;">
            {btns_indented}
          </div>
        </div>
        <div class="hero-illustration-container" style="text-align: center;">
          <img src="./assets/images/{img_name}" alt="{alt_text}" style="max-width: 100%; height: auto; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: 1px solid rgba(255,255,255,0.1);">
        </div>
      </div>'''
      
    updated_content = pattern.sub(new_hero_content, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print(f"Successfully updated hero in {filename}")
