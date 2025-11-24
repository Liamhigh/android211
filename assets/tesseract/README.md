# Tesseract Language Files (Optional Pre-seeding)

This directory can be used to pre-seed the Tesseract OCR language cache for offline operation.

## How OCR Works in This App

### Default Behavior (Offline-First)
1. **First Run**: App downloads `eng.traineddata` from CDN (requires internet)
2. **Cached**: Language file is saved to device cache directory
3. **Subsequent Runs**: Uses cached file (fully offline)

### Optional: Pre-seed for Fully Offline First Run
If you need the app to work offline from the very first use:

1. Download: https://github.com/tesseract-ocr/tessdata_fast/raw/main/eng.traineddata
2. Place file in: `{device}/cache/tesseract/eng.traineddata`
3. This requires manual file placement on the device before first use

## Why This Approach?

Expo/React Native apps cannot easily bundle large binary assets (like 5MB .traineddata files) 
in a way that Tesseract.js can access at runtime. The caching approach ensures:

- ✅ Offline operation after first use
- ✅ Smaller APK size
- ✅ Automatic updates if language data changes
- ✅ No complex asset loading code

## File Details
- File: `eng.traineddata` (uncompressed)
- Size: ~4.9 MB (tessdata_fast)
- Language: English
- Source: https://github.com/tesseract-ocr/tessdata_fast

## For Truly Offline Environments

If deploying to devices that will NEVER have internet:
1. Build and install the app on a device with internet
2. Run OCR once to cache the language data
3. The app will then work offline indefinitely
4. OR manually place eng.traineddata in the cache directory via USB/ADB
