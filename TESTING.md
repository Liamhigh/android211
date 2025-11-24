# Build Verification & Testing Guide

Complete checklist to verify your Verum Omnis Contradiction Engine build is working correctly.

## 🔍 Pre-Build Verification

### File Structure Check
```bash
cd android211

# Verify all required files exist
test -f App.js && echo "✓ App.js"
test -f package.json && echo "✓ package.json"
test -f app.json && echo "✓ app.json"
test -f eas.json && echo "✓ eas.json"

# Verify directories
test -d screens && echo "✓ screens/"
test -d components && echo "✓ components/"
test -d utils && echo "✓ utils/"
test -d theme && echo "✓ theme/"
test -d assets && echo "✓ assets/"
```

### Dependency Check
```bash
# Install and verify dependencies
npm install

# Check for vulnerabilities
npm audit

# List installed packages
npm list --depth=0
```

Expected key packages:
- ✅ expo (~51.0.0)
- ✅ react-native (0.74.0)
- ✅ @react-navigation/native
- ✅ tesseract.js
- ✅ pdf-lib
- ✅ crypto-js

## 🏗️ Build Verification

### Local Development Build (Optional)
```bash
# Start Expo dev server
expo start

# Expected output:
# ✓ Metro bundler starts
# ✓ QR code displays
# ✓ No compilation errors
```

### Production Build
```bash
# Login to Expo
eas login

# Verify configuration
eas build:configure

# Build preview APK
eas build -p android --profile preview

# Expected output:
# ✓ Build queued successfully
# ✓ Build completes in 5-10 minutes
# ✓ Download link provided
```

## 📱 Post-Install Testing

### Installation Test
1. ✅ Download APK from EAS link
2. ✅ Install on Android device
3. ✅ Accept permissions if prompted
4. ✅ App icon appears in launcher
5. ✅ App launches without crash

### Landing Screen Test
1. ✅ App opens to landing screen
2. ✅ Logo displays correctly
3. ✅ "Verum Omnis" title visible
4. ✅ Version number shows "v5.2.6"
5. ✅ Two buttons present:
   - "Analyse Text"
   - "Scan Document (OCR)"
6. ✅ Footer text displays
7. ✅ Dark theme applied correctly

### Text Analysis Test

**Sample Input:**
```
I did not go to the store.
I went to the store.
I was alone the entire time.
My friend came with me.
```

**Steps:**
1. ✅ Tap "Analyse Text"
2. ✅ Paste sample text
3. ✅ Tap "Analyse" button
4. ✅ Processing screen shows
5. ✅ Results screen appears
6. ✅ Contradictions detected (2-4 expected)
7. ✅ Consistency score displays (60-80% expected)
8. ✅ Individual contradictions listed
9. ✅ "Generate Sealed PDF" button visible

### PDF Generation Test
1. ✅ Tap "Generate Sealed PDF"
2. ✅ Loading indicator shows
3. ✅ "PDF Ready" message appears
4. ✅ "Share / Export PDF" button visible
5. ✅ Tap share button
6. ✅ Share sheet opens
7. ✅ Can share to other apps
8. ✅ PDF opens correctly in PDF viewer

### OCR Test (if camera available)

**Steps:**
1. ✅ Return to landing screen
2. ✅ Tap "Scan Document (OCR)"
3. ✅ Tap "Take Photo"
4. ✅ Camera permission granted
5. ✅ Camera opens
6. ✅ Capture a document with text
7. ✅ Image displays in preview
8. ✅ "Extracting text..." message shows
9. ✅ Text appears in box
10. ✅ "Analyse Extracted Text" button appears
11. ✅ Analysis works as expected

### Image Upload Test
1. ✅ Tap "Upload Image"
2. ✅ File picker opens
3. ✅ Select image with text
4. ✅ Image displays
5. ✅ OCR extraction works
6. ✅ Text analysis works

### Navigation Test
1. ✅ Back navigation works on all screens
2. ✅ No crashes when navigating
3. ✅ State persists correctly
4. ✅ Can return to landing screen
5. ✅ Multiple analyses can be run

## 🔐 Security Verification

### Code Security
```bash
# Run CodeQL analysis (already done)
# Result: ✅ 0 vulnerabilities found
```

### Privacy Check
1. ✅ No network requests made during analysis
2. ✅ Works in airplane mode
3. ✅ No data sent to external servers
4. ✅ No analytics tracking
5. ✅ No crash reporting without consent

### PDF Integrity
1. ✅ SHA-512 hash included in PDF
2. ✅ Timestamp present
3. ✅ Forensic seal visible
4. ✅ Can verify hash independently
5. ✅ PDF not editable without detection

## 📊 Performance Testing

### Load Test
1. ✅ Short text (< 100 words): < 1 second
2. ✅ Medium text (100-500 words): 1-2 seconds
3. ✅ Long text (500-1000 words): 2-5 seconds
4. ✅ No crashes with large input

### Memory Test
1. ✅ App launches quickly
2. ✅ No memory leaks during use
3. ✅ Multiple analyses don't slow down
4. ✅ OCR doesn't cause crashes
5. ✅ PDF generation completes

### UI Responsiveness
1. ✅ Buttons respond immediately
2. ✅ Loading indicators show during work
3. ✅ No UI freezing
4. ✅ Smooth scrolling
5. ✅ Animations play correctly

## 🐛 Edge Case Testing

### Empty Input
1. ✅ Button disabled when text empty
2. ✅ Or shows helpful message
3. ✅ No crash

### Special Characters
```
Test input: !@#$%^&*()_+-=[]{}|;':",.<>?/
```
1. ✅ Handles special characters
2. ✅ No parsing errors
3. ✅ PDF generates correctly

### Very Long Text
1. ✅ Handles 1000+ word documents
2. ✅ Analysis completes
3. ✅ PDF generation works
4. ✅ May truncate in PDF (expected)

### OCR Edge Cases
1. ✅ Blurry image: Shows error or partial text
2. ✅ No text in image: "No text detected"
3. ✅ Multiple languages: Best effort
4. ✅ Handwriting: May not work (expected)

## ✅ Final Checklist

Before considering the app production-ready:

### Functionality
- [ ] All screens load correctly
- [ ] Text analysis works
- [ ] OCR works (camera + upload)
- [ ] PDF generation works
- [ ] Sharing/export works
- [ ] Navigation works
- [ ] No crashes during normal use

### Quality
- [ ] UI looks professional
- [ ] Dark theme consistent
- [ ] Loading states visible
- [ ] Error messages helpful
- [ ] Performance acceptable

### Security
- [ ] No vulnerabilities found
- [ ] Offline processing verified
- [ ] No data leaks
- [ ] PDF integrity verified

### Documentation
- [ ] README.md reviewed
- [ ] QUICKSTART.md followed
- [ ] SETUP.md tested
- [ ] All guides accurate

### Assets (if replacing placeholders)
- [ ] logo.png replaced
- [ ] watermark.png replaced
- [ ] fingerprint.png replaced
- [ ] Icons look professional

### Legal
- [ ] Privacy policy prepared (if publishing)
- [ ] Terms of service ready (if needed)
- [ ] Copyright/patent info correct

## 🚀 Production Release Checklist

### Pre-Release
- [ ] All tests pass
- [ ] Assets finalized
- [ ] Documentation updated
- [ ] Version number set

### Build Production
```bash
eas build -p android --profile production
```

### Play Store (if publishing)
- [ ] Developer account created ($25)
- [ ] App listing created
- [ ] Screenshots prepared (min 2)
- [ ] Description written
- [ ] Privacy policy uploaded
- [ ] Content rating completed
- [ ] AAB uploaded
- [ ] Submitted for review

### Post-Release
- [ ] Monitor crash reports
- [ ] Check user reviews
- [ ] Plan updates/fixes
- [ ] Maintain documentation

## 📝 Test Results Template

```
Date: _____________
Tester: ___________
Device: ___________
Android Version: ___

✅ PASS / ❌ FAIL

[ ] Installation
[ ] Landing Screen
[ ] Text Analysis
[ ] PDF Generation
[ ] OCR (Camera)
[ ] OCR (Upload)
[ ] Navigation
[ ] Performance
[ ] Security
[ ] Edge Cases

Notes:
________________
________________
________________
```

## 🆘 Troubleshooting Test Failures

### App Won't Install
- Check Android version (5.0+ required)
- Enable "Unknown Sources"
- Clear cache and retry

### OCR Not Working
- Grant camera permission
- Check image quality
- Try well-lit, clear images
- Ensure sufficient storage

### PDF Won't Generate
- Check storage space
- Grant write permission
- Try simpler analysis first

### Crashes
- Check device RAM (2GB+ recommended)
- Update Android version if old
- Clear app data and retry
- Check console logs

---

**Testing Complete!** ✅

If all tests pass, your Verum Omnis Contradiction Engine is production-ready!
