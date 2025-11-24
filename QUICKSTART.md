# Quick Start Guide - Verum Omnis Contradiction Engine

Get your APK built and running in under 30 minutes.

## 🚀 Super Fast Setup (Copy-Paste Ready)

### For Termux Users (Android)

```bash
# 1. Setup environment (run once)
pkg update && pkg upgrade -y
pkg install nodejs-lts git python openssl -y
npm install -g expo-cli eas-cli
export NODE_OPTIONS=--openssl-legacy-provider
echo 'export NODE_OPTIONS=--openssl-legacy-provider' >> ~/.bashrc

# 2. Clone and setup project
cd ~
git clone https://github.com/Liamhigh/android211.git
cd android211
npm install

# 3. Login to Expo (create free account at expo.dev if needed)
eas login

# 4. Build APK
eas build -p android --profile preview

# Wait 5-10 minutes, then download and install the APK!
```

## 📱 What You Get

A fully functional mobile app with:

✅ **9-Brain Contradiction Analysis**
- Detects linguistic contradictions
- Identifies timeline inconsistencies  
- Finds evidence gaps
- Analyzes behavioral conflicts
- Checks legal impossibilities
- Cross-references facts
- Evaluates intent coherence
- Assesses emotional alignment
- Synthesizes consensus score

✅ **Document Scanning (OCR)**
- Camera capture
- Image upload
- Text extraction
- Auto-analysis

✅ **Forensic PDF Generation**
- SHA-512 cryptographic hash
- Timestamp verification
- Sealed document export
- Share to any app

## 📋 System Requirements

### Minimum:
- Android 5.0 (Lollipop) or higher
- 100 MB free storage
- Internet (for initial build only)

### Recommended:
- Android 8.0 (Oreo) or higher
- 200 MB free storage
- Camera for OCR features

## 🔨 Build Options

### Preview Build (Testing)
```bash
eas build -p android --profile preview
```
- Generates APK
- Direct install
- No code signing required
- Perfect for testing and sharing

### Production Build (Play Store)
```bash
eas build -p android --profile production
```
- Generates AAB
- Code signed
- Optimized
- Ready for Play Store

## 🎯 First Time Use

1. **Install APK**
   - Download from EAS build link
   - Enable "Install from Unknown Sources"
   - Install

2. **Launch App**
   - Open "Verum Omnis Contradiction Engine"
   - Choose "Analyse Text" or "Scan Document"

3. **Analyse Text**
   - Paste or type content
   - Tap "Analyse"
   - View contradiction report
   - Generate sealed PDF

4. **Scan Document**
   - Take photo or upload image
   - Wait for text extraction
   - Tap "Analyse Extracted Text"
   - View results and generate PDF

## 🛠️ Common Issues & Fixes

### "Module not found" during npm install
```bash
npm install --legacy-peer-deps
```

### Metro bundler crashes
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### EAS build fails
```bash
# Check you're logged in
eas whoami

# Re-login if needed
eas login

# Ensure clean state
rm -rf node_modules
npm install
eas build -p android --profile preview
```

### OCR not working on device
- Ensure good lighting
- Use clear, high-contrast images
- Try taking a new photo
- Check app permissions

### PDF generation fails
- Ensure sufficient storage
- Check write permissions
- Try simpler analysis first

## 📊 Testing Your Build

### Quick Test Checklist

1. ✅ App launches successfully
2. ✅ Landing screen displays correctly
3. ✅ Text input works
4. ✅ Analysis runs and completes
5. ✅ Results display properly
6. ✅ PDF generates successfully
7. ✅ Sharing/export works
8. ✅ OCR camera works (if device has camera)
9. ✅ Image upload works
10. ✅ Back navigation works

### Sample Test Text

```
I did not go to the store on Monday.
I went to the store on Monday.
I was alone the entire time.
My friend came with me.
```

Expected: 2-4 contradictions detected, score around 60-80%

## 🚢 Deploy to Play Store

When ready for public release:

1. **Build production AAB**
   ```bash
   eas build -p android --profile production
   ```

2. **Create Play Console account**
   - Visit https://play.google.com/console
   - Pay $25 one-time fee

3. **Upload AAB**
   - Create new app
   - Upload AAB from EAS
   - Add screenshots, description
   - Set content rating

4. **Submit for review**
   - Usually approved in 24-48 hours

## 📝 Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Colors
Edit `theme/colors.js`:
```javascript
export default {
  background: "#YourColor",
  primary: "#YourColor",
  // etc...
};
```

### Add Your Logo
Replace files in `assets/`:
- `logo.png` (512x512 px)
- `watermark.png` (300x300 px)
- `fingerprint.png` (100x100 px)

## 💡 Pro Tips

1. **First build takes longest** (10-15 min)
   Subsequent builds are faster (~5 min)

2. **Test locally first**
   ```bash
   expo start
   ```
   Use Expo Go app to preview

3. **Share APK directly**
   No need for app store for internal testing

4. **Keep dependencies updated**
   ```bash
   npm update
   ```

5. **Monitor build logs**
   Check EAS dashboard for detailed logs

## 🆘 Get Help

- **Documentation**: See README.md, SETUP.md, ASSETS.md
- **Expo Docs**: https://docs.expo.dev
- **GitHub Issues**: https://github.com/Liamhigh/android211/issues

## ✅ Success Checklist

- [ ] Termux installed and updated
- [ ] Node.js, Git, Python installed
- [ ] Expo and EAS CLI installed
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Expo account created and logged in
- [ ] First build completed
- [ ] APK downloaded and installed
- [ ] App tested and working
- [ ] Ready to use or share!

---

**You're now ready to deploy the Verum Omnis Contradiction Engine!** 🎉

For any questions or issues, refer to the comprehensive documentation in the repository.
