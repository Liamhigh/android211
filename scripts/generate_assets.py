#!/usr/bin/env python3
"""
Generate placeholder assets for Verum Omnis Contradiction Engine
This creates simple PNG placeholders until real assets are available
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("PIL/Pillow not installed. Installing...")
    import subprocess
    subprocess.check_call(["pip", "install", "pillow"])
    from PIL import Image, ImageDraw, ImageFont
    import os

# Colors from theme
PRIMARY = "#1F4BA7"
PRIMARY_LIGHT = "#83B4FF"
BACKGROUND = "#0A1524"

def create_logo(size=512):
    """Create a simple logo placeholder"""
    img = Image.new('RGBA', (size, size), (31, 75, 167, 255))  # PRIMARY color
    draw = ImageDraw.Draw(img)
    
    # Draw a simple circle
    margin = size // 4
    draw.ellipse([margin, margin, size-margin, size-margin], 
                 fill=(131, 180, 255, 255))  # PRIMARY_LIGHT
    
    # Try to add text
    try:
        font_size = size // 4
        # Use default font
        font = ImageFont.load_default()
        text = "VO"
        
        # Get text size for centering
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        position = ((size - text_width) // 2, (size - text_height) // 2)
        draw.text(position, text, fill=(255, 255, 255, 255), font=font)
    except Exception as e:
        print(f"Could not add text to logo: {e}")
    
    return img

def create_watermark(size=300):
    """Create a watermark placeholder"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw semi-transparent shield shape
    points = [
        (size//2, size//4),
        (size*3//4, size//2),
        (size*3//4, size*3//4),
        (size//2, size*7//8),
        (size//4, size*3//4),
        (size//4, size//2),
    ]
    draw.polygon(points, fill=(31, 75, 167, 64))  # 25% opacity
    
    return img

def create_fingerprint(size=100):
    """Create a fingerprint icon placeholder"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw concentric arcs to simulate fingerprint
    center = size // 2
    for i in range(5):
        radius = (i + 1) * (size // 12)
        draw.ellipse([center-radius, center-radius, center+radius, center+radius],
                    outline=(131, 180, 255, 255), width=2)
    
    return img

def main():
    # Get the assets directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    assets_dir = os.path.join(project_dir, "assets")
    
    # Create assets directory if it doesn't exist
    os.makedirs(assets_dir, exist_ok=True)
    
    print("Generating placeholder assets...")
    
    # Generate logo
    logo_path = os.path.join(assets_dir, "logo.png")
    logo = create_logo(512)
    logo.save(logo_path)
    print(f"✓ Created {logo_path}")
    
    # Generate watermark
    watermark_path = os.path.join(assets_dir, "watermark.png")
    watermark = create_watermark(300)
    watermark.save(watermark_path)
    print(f"✓ Created {watermark_path}")
    
    # Generate fingerprint
    fingerprint_path = os.path.join(assets_dir, "fingerprint.png")
    fingerprint = create_fingerprint(100)
    fingerprint.save(fingerprint_path)
    print(f"✓ Created {fingerprint_path}")
    
    print("\n✅ All placeholder assets generated successfully!")
    print("Replace these with your actual Verum Omnis branding before production.")

if __name__ == "__main__":
    main()
