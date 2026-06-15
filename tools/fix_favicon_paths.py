import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace root-relative paths with relative paths
    updated = content.replace('href="/assets/favicon/', 'href="./assets/favicon/')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(updated)
        
    print(f"Fixed favicon paths in {filename}")
