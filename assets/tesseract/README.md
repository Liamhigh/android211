# Tesseract Language Files

This directory contains the Tesseract OCR language training data for offline use.

## Required Files
- `eng.traineddata` - English language training data (uncompressed)

## Download Instructions
If the language file is missing, download it from:
https://github.com/tesseract-ocr/tessdata_fast/raw/main/eng.traineddata

Place the uncompressed `eng.traineddata` file in this directory before building the Android APK.

**Important**: Use the uncompressed `.traineddata` file, not the `.gz` compressed version.

## Why This is Needed
The app is designed to work completely offline. By bundling the language data
with the app, Tesseract.js doesn't need to download files from a CDN at runtime.
The language file will be cached on the device after first use for optimal performance.

## File Size
- eng.traineddata: ~4.9 MB (tessdata_fast version)
- Alternative: eng.traineddata from tessdata_best (~11 MB, more accurate but slower)

Choose based on your accuracy vs speed requirements.
