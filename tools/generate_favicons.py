import os
from PIL import Image

logo_path = 'assets/images/favicon-logo.png'
favicon_dir = 'assets/favicon'

if not os.path.exists(logo_path):
    print(f"Error: Logo file not found at {logo_path}")
    exit(1)

# Load the high-res logo image
img = Image.open(logo_path)

# Ensure output directory exists
os.makedirs(favicon_dir, exist_ok=True)

# Generate PNG icons
targets = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'apple-touch-icon.png': (180, 180),
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512),
}

for name, size in targets.items():
    out_path = os.path.join(favicon_dir, name)
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(out_path, 'PNG')
    print(f"Generated {out_path} ({size[0]}x{size[1]})")

# Generate .ico file (contains 16x16, 32x32, 48x48)
ico_path = os.path.join(favicon_dir, 'favicon.ico')
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_imgs = [img.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
# Save as ICO with multiple sizes
ico_imgs[1].save(ico_path, format='ICO', sizes=ico_sizes, append_images=[ico_imgs[0], ico_imgs[2]])
print(f"Generated {ico_path} with sizes 16, 32, 48")
