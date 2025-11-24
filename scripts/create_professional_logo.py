#!/usr/bin/env python3
"""
Create a professional logo for Verum Omnis Contradiction Engine
"""

from PIL import Image, ImageDraw, ImageFont
import math

# Theme colors
PRIMARY = (31, 75, 167, 255)  # #1F4BA7
PRIMARY_LIGHT = (131, 180, 255, 255)  # #83B4FF
BACKGROUND = (10, 21, 36, 255)  # #0A1524
WHITE = (255, 255, 255, 255)

def create_professional_logo(size=512):
    """Create a professional logo with V and O letters intertwined"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background circle with gradient effect
    center = size // 2
    
    # Create a circular background
    for i in range(size//2, 0, -1):
        alpha = int(255 * (i / (size//2)))
        color = (PRIMARY[0], PRIMARY[1], PRIMARY[2], min(alpha, 255))
        draw.ellipse([center-i, center-i, center+i, center+i], fill=color)
    
    # Draw shield shape for "truth and verification" symbolism
    margin = size // 6
    shield_points = [
        (center, margin),  # Top center
        (size - margin, margin + size//6),  # Top right
        (size - margin, size - margin - size//6),  # Bottom right
        (center, size - margin//2),  # Bottom center point
        (margin, size - margin - size//6),  # Bottom left
        (margin, margin + size//6),  # Top left
    ]
    
    # Draw shield outline
    draw.polygon(shield_points, outline=PRIMARY_LIGHT, width=8)
    
    # Add inner shield for depth
    inner_margin = margin + 20
    inner_shield_points = [
        (center, inner_margin),
        (size - inner_margin, inner_margin + size//8),
        (size - inner_margin, size - inner_margin - size//8),
        (center, size - inner_margin//2),
        (inner_margin, size - inner_margin - size//8),
        (inner_margin, inner_margin + size//8),
    ]
    draw.polygon(inner_shield_points, outline=WHITE, width=3)
    
    # Draw "V" and "O" in the center
    text_y = center - size//8
    
    # Try to use a better font, fall back to default if not available
    try:
        # Try to load a truetype font
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", size // 3)
        except:
            # Fall back to default
            font = ImageFont.load_default()
    
    # Draw "V" and "O" letters
    text = "VO"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2
    
    # Draw text with shadow for depth
    shadow_offset = 4
    draw.text((text_x + shadow_offset, text_y + shadow_offset), text, 
              fill=(0, 0, 0, 128), font=font)
    draw.text((text_x, text_y), text, fill=WHITE, font=font)
    
    # Add small "truth engine" symbolism - 9 small dots around for 9-brain analysis
    dot_radius = size // 50
    circle_radius = size // 3
    for i in range(9):
        angle = (i * 360 / 9) * (math.pi / 180)
        dot_x = center + int(circle_radius * math.cos(angle))
        dot_y = center + int(circle_radius * math.sin(angle))
        draw.ellipse([dot_x-dot_radius, dot_y-dot_radius, 
                     dot_x+dot_radius, dot_y+dot_radius], 
                    fill=PRIMARY_LIGHT)
    
    return img

def main():
    import os
    
    # Get the assets directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    assets_dir = os.path.join(project_dir, "assets")
    
    # Create assets directory if it doesn't exist
    os.makedirs(assets_dir, exist_ok=True)
    
    print("Creating professional Verum Omnis logo...")
    
    # Generate logo
    logo_path = os.path.join(assets_dir, "logo.png")
    logo = create_professional_logo(512)
    logo.save(logo_path)
    print(f"✓ Created {logo_path}")
    
    print("\n✅ Professional logo created successfully!")
    print("This logo features:")
    print("  - Shield design representing truth and verification")
    print("  - 'VO' letters for Verum Omnis")
    print("  - 9 dots symbolizing the 9-brain analysis system")
    print("  - Professional color scheme matching app theme")

if __name__ == "__main__":
    main()
