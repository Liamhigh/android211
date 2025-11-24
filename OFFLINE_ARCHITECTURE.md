# Offline Architecture - Verum Contradiction Engine

## Overview
This Android app is designed to work **100% offline** for maximum security and reliability. All document sealing, PDF generation, OCR processing, and cryptographic operations happen locally on the device without any internet connectivity.

## Offline Components

### ✅ PDF Generation (pdf-lib)
- **Status**: Fully Offline
- **Implementation**: Pure JavaScript PDF creation
- **Location**: `utils/pdfGenerator.js`
- **Features**:
  - Creates A4 PDFs with text, forensic hashes, timestamps
  - No external dependencies or network calls
  - All fonts embedded (StandardFonts.Helvetica)

### ✅ Cryptographic Hashing (crypto-js)
- **Status**: Fully Offline
- **Implementation**: SHA-512 hashing for document integrity
- **Location**: `utils/hash.js`
- **Features**:
  - Pure JavaScript implementation
  - No cloud services or external APIs
  - Forensic-grade hash generation for chain of custody

### ✅ QR Code Generation (qrcode)
- **Status**: Fully Offline
- **Implementation**: Pure JavaScript QR code creation
- **Features**:
  - Generates QR codes from hash data
  - No external services required
  - Embedded directly in PDF documents

### ✅ OCR Text Extraction (tesseract.js)
- **Status**: Offline-First (caches language data locally)
- **Implementation**: Tesseract OCR with local caching
- **Location**: `utils/ocr.js`
- **Configuration**:
  ```javascript
  const worker = await createWorker({
    cachePath: `${FileSystem.cacheDirectory}tesseract/`,
    cacheMethod: 'write',
  });
  ```
- **Offline Operation**:
  - First run: Downloads language data (requires internet)
  - Subsequent runs: Uses cached data (fully offline)
  - Cache persists across app sessions
  - For pre-seeded offline: Manually place eng.traineddata in cache directory

### ✅ Image Processing (expo-image-manipulator)
- **Status**: Fully Offline
- **Implementation**: Native image manipulation
- **Features**:
  - Resize, crop, compress images locally
  - No cloud services
  - Pure on-device processing

### ✅ File System Operations (expo-file-system)
- **Status**: Fully Offline
- **Implementation**: Native file system access
- **Features**:
  - Read/write files locally
  - Document directory storage
  - Cache management

### ✅ Contradiction Analysis Engine
- **Status**: Fully Offline
- **Implementation**: Custom AI-powered logic (9 brain modules)
- **Location**: `utils/contradictionEngine.js`
- **Features**:
  - Linguistic logic analysis
  - Timeline reasoning
  - Evidence correlation
  - Behavioral semantics
  - Legal impossibility detection
  - Factual cross-reference
  - Intent & meaning coherence
  - Emotional alignment
  - Consensus synthesis
- **No External APIs**: All processing done locally

## Network Permissions

### Android Permissions (app.json)
```json
"permissions": [
  "READ_EXTERNAL_STORAGE",
  "WRITE_EXTERNAL_STORAGE",
  "CAMERA"
]
```

**Note**: No explicit INTERNET permission is declared in the manifest. However, Android apps have network access by default. The app uses the network only once - to download OCR language data (~5MB) on first use. After caching, all operations are offline.

## Build Configuration

### EAS Build (eas.json)
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### Asset Bundling
- All static assets bundled via `assetBundlePatterns: ["**/*"]`
- Images, icons, and splash screens included
- OCR language data cached on first use (or pre-seeded manually)

## Why Offline-First?

1. **Security**: No data leaves the device
2. **Reliability**: Works in areas without connectivity  
3. **Privacy**: No cloud services, no tracking
4. **Speed**: No network latency
5. **Legal Compliance**: Chain of custody maintained locally
6. **Forensic Integrity**: All sealing operations happen on-device

## Offline Operation Notes

### OCR Language Data - One-Time Setup
- **First OCR Use**: Requires internet to download `eng.traineddata` (~5MB) from CDN
- **After First Use**: Fully offline - uses cached language data indefinitely
- **For Air-Gapped Deployment**: 
  - Option 1: Run app once on internet-connected device, then use adb backup/restore
  - Option 2: Deploy to devices with temporary internet, run OCR once per device
  - Option 3: Custom build process to pre-bundle cached data
- **Cache Location**: `{app_cache_directory}/tesseract/eng.traineddata`

### All Other Operations - Always Offline
- **100% Offline**: PDF generation, hashing, QR codes, image processing, contradiction analysis
- **No Network Calls**: All processing happens on-device (except initial OCR language download)
- **Privacy**: No analytics, tracking, or cloud services
- **Security**: Chain of custody maintained entirely on device

## Dependencies Audit

All dependencies verified for offline capability:

| Package | Version | Offline | Notes |
|---------|---------|---------|-------|
| pdf-lib | 1.17.1 | ✅ | Pure JS PDF generation |
| crypto-js | 4.2.0 | ✅ | Pure JS cryptography |
| qrcode | ^1.5.4 | ✅ | Pure JS QR generation |
| tesseract.js | ^4.1.1 | ✅* | *Caches language data locally |
| expo-file-system | ~17.0.0 | ✅ | Native filesystem |
| expo-camera | ~15.0.0 | ✅ | Native camera |
| expo-image-picker | ~16.0.0 | ✅ | Native picker |
| expo-image-manipulator | ~12.0.0 | ✅ | Native processing |
| expo-sharing | ~12.0.0 | ✅ | Native sharing |
| expo-asset | ~10.0.0 | ✅ | Asset bundling |

## Testing Offline Mode

To verify the app works offline:

1. Build the APK
2. Install on Android device
3. Enable airplane mode
4. Test all features:
   - Camera capture
   - Image selection
   - OCR text extraction
   - Contradiction analysis
   - PDF generation
   - Document sealing
   - Share/export functions

All features should work without any network errors.

## Future Enhancements

- Add offline speech-to-text for dictation
- Include multi-language support (bundle additional .traineddata files)
- Implement on-device backup/restore
- Add biometric authentication for document access
