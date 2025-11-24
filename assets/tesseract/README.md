# Tesseract Language Files

This directory contains the Tesseract OCR language training data for offline use.

## Required Files
- `eng.traineddata.gz` - English language training data (compressed)

## Download Instructions
If the language file is missing, download it from:
https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata.gz

Place the file in this directory before building the Android APK.

## Why This is Needed
The app is designed to work completely offline. By bundling the language data
with the app, Tesseract.js doesn't need to download files from a CDN at runtime.
