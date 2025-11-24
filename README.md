# Verum Omnis - Contradiction Engine

**Version 5.2.6**

A production-ready mobile application for forensic contradiction analysis with OCR capabilities, PDF sealing, and SHA-512 cryptographic verification.

## 🎯 Features

### Core Capabilities
- **9-Brain Contradiction Detection Engine** - Multi-dimensional analysis across 9 different reasoning systems
- **OCR Document Scanning** - Extract text from images using Tesseract.js
- **Forensic PDF Generation** - Generate sealed PDFs with SHA-512 hashing
- **Dark Forensic UI** - Professional dark theme optimized for mobile
- **Offline Processing** - All analysis happens locally on device
- **Privacy First** - No data leaves your device

### The 9-Brain Analysis System

1. **Linguistic Logic** - Direct contradictions (did/didn't, was/wasn't)
2. **Timeline Reasoning** - Temporal inconsistencies
3. **Evidence Correlation** - Missing or unsupported claims
4. **Behavioral Semantics** - Emotional state contradictions
5. **Legal Impossibility** - Actions beyond authority
6. **Factual Cross-Reference** - Conflicting statements
7. **Intent & Meaning** - Purpose contradictions
8. **Emotional Alignment** - Sentiment inconsistencies
9. **Consensus Synthesis** - Final scoring and hash generation

## 📱 Tech Stack

- **React Native** 0.74.0
- **Expo** SDK 51
- **Tesseract.js** - OCR engine
- **pdf-lib** - PDF generation
- **crypto-js** - SHA-512 hashing
- **React Navigation** - Screen navigation

## 🚀 Quick Start (Termux on Android)

### Prerequisites

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts git python openssl -y
npm install -g expo-cli eas-cli
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Liamhigh/android211.git
cd android211

# Install dependencies
npm install

# Configure environment (important for Termux)
export NODE_OPTIONS=--openssl-legacy-provider

# Start development server
expo start
```

### Building APK

```bash
# Configure EAS build
eas build:configure

# Build APK for preview/testing
eas build -p android --profile preview

# Build for production
eas build -p android --profile production
```

## 📂 Project Structure

```
verum-contradiction-engine/
│
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── eas.json                        # Build configuration
│
├── assets/                         # Images and resources
│   ├── logo.png                    # App logo (512x512)
│   ├── watermark.png               # PDF watermark
│   └── fingerprint.png             # Forensic seal icon
│
├── screens/                        # All app screens
│   ├── LandingScreen.js           # Home screen
│   ├── InputScreen.js             # Text input
│   ├── OcrScreen.js               # Camera/OCR
│   ├── ProcessingScreen.js        # Analysis animation
│   ├── ResultScreen.js            # Results display
│   └── PdfScreen.js               # PDF generation
│
├── components/                     # Reusable components
│   ├── VOButton.js                # Custom button
│   ├── Card.js                    # Content card
│   └── Header.js                  # Header component
│
├── theme/                          # Theme system
│   ├── colors.js                  # Color palette
│   └── ThemeContext.js            # Theme provider
│
└── utils/                          # Core utilities
    ├── contradictionEngine.js     # 9-Brain analysis
    ├── pdfGenerator.js            # PDF sealing
    ├── hash.js                    # SHA-512 hashing
    └── ocr.js                     # OCR processing
```

## 🔧 Configuration

### Add Your Assets

Before building, add these files to the `assets/` directory:

- `logo.png` - Your app logo (512x512 px, PNG)
- `watermark.png` - PDF watermark (optional)
- `fingerprint.png` - Forensic seal icon (optional)

### Customize Theme

Edit `theme/colors.js` to customize colors:

```javascript
export default {
  background: "#0A1524",    // Main background
  card: "#112032",          // Card background
  primary: "#1F4BA7",       // Primary button color
  primaryLight: "#83B4FF",  // Accent color
  text: "#FFFFFF",          // Text color
  textMuted: "#6A7B92",     // Muted text
  border: "#1D2C40"         // Border color
};
```

## 📋 Usage

### Analyse Text
1. Launch app
2. Tap "Analyse Text"
3. Paste or type content
4. View contradiction analysis
5. Generate sealed PDF

### Scan Document (OCR)
1. Launch app
2. Tap "Scan Document (OCR)"
3. Take photo or upload image
4. Wait for text extraction
5. Analyse extracted text
6. Generate sealed PDF

## 🔐 Security Features

- **SHA-512 Hashing** - Cryptographic verification of analysis
- **Offline Processing** - No data sent to external servers
- **Forensic Sealing** - Tamper-evident PDF generation
- **Chain of Custody** - Hash includes text + results + score

## 📱 Deployment

### Testing APK
After running `eas build -p android --profile preview`, you'll receive a download link for the APK. Install it directly on your Android device.

### Play Store (Production)
1. Run `eas build -p android --profile production`
2. Download the AAB file
3. Upload to Google Play Console
4. Add store listing, screenshots, privacy policy
5. Submit for review

## 🛠️ Troubleshooting

### Metro Bundler Crashes
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### Missing Dependencies
```bash
npm install
```

### Permission Issues
Ensure `app.json` includes required Android permissions:
- CAMERA
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

### OCR Not Working
- Ensure images are clear and well-lit
- Try resizing image to lower resolution
- Check console logs for Tesseract errors

## 📄 License

Patent Pending - Verum Omnis

## 🤝 Contributing

This is a proprietary forensic tool. Contributions are not currently accepted.

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Enhanced OCR with multiple language support
- [ ] Cloud backup option (encrypted)
- [ ] Advanced PDF customization
- [ ] Batch document processing
- [ ] Integration with legal databases
- [ ] Machine learning enhancement for contradiction detection

---

**Built with ❤️ for truth and justice**

*Verum Omnis - Where contradictions cannot hide*
