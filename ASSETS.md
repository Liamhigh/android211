# Asset Requirements

The Verum Omnis Contradiction Engine requires the following assets in the `assets/` directory.

## Required Assets

### 1. logo.png
- **Purpose**: App icon and landing screen logo
- **Dimensions**: 512x512 pixels (minimum)
- **Format**: PNG with transparency
- **Usage**: 
  - App icon (Android launcher)
  - Landing screen header
  - PDF header (optional)

### 2. watermark.png (Optional)
- **Purpose**: PDF watermark overlay
- **Dimensions**: 300x300 pixels
- **Format**: PNG with transparency
- **Usage**: 
  - Centered behind PDF text (15% opacity)
  - Forensic seal indicator

### 3. fingerprint.png (Optional)
- **Purpose**: Forensic authenticity indicator
- **Dimensions**: 100x100 pixels
- **Format**: PNG with transparency
- **Usage**: 
  - PDF footer
  - Authentication badge

## Creating Placeholder Assets

If you don't have custom assets yet, you can create simple placeholders:

### Using ImageMagick (Termux)

```bash
pkg install imagemagick -y

# Create logo placeholder
convert -size 512x512 xc:#1F4BA7 \
  -gravity center \
  -pointsize 60 \
  -fill white \
  -annotate +0+0 "VO" \
  assets/logo.png

# Create watermark placeholder
convert -size 300x300 xc:none \
  -gravity center \
  -pointsize 80 \
  -fill "#1F4BA740" \
  -annotate +0+0 "VERUM" \
  assets/watermark.png
```

### Using Python (Alternative)

```bash
pkg install python pillow -y

# Run the asset generator script
python3 scripts/generate_assets.py
```

## Design Guidelines

### Logo Design
- **Style**: Clean, professional, minimalist
- **Colors**: Primary (#1F4BA7) with white accents
- **Elements**: Should represent truth, verification, or forensic analysis
- **Text**: "VO" monogram or full "Verum Omnis" wordmark

### Watermark Design
- **Opacity**: Will be rendered at 15% in PDFs
- **Detail**: Should be recognizable even at low opacity
- **Style**: Subtle, non-intrusive
- **Purpose**: Authenticity verification

### Fingerprint Icon
- **Style**: Simple line art
- **Purpose**: Security and verification indicator
- **Usage**: Small badge/icon

## Current Status

📍 **Placeholder files are currently in place**

The app will build and run with placeholder assets, but you should replace them with your actual Verum Omnis branding before production release.

## Updating Assets

1. Place your PNG files in `assets/` directory
2. Ensure filenames match exactly: `logo.png`, `watermark.png`, `fingerprint.png`
3. Rebuild the app: `eas build -p android --profile preview`

## Testing Assets

To test how assets appear in the app:

```bash
# Start development server
expo start

# Or build preview APK
eas build -p android --profile preview
```

---

**Note**: High-quality, professional assets significantly improve app credibility and user trust.
