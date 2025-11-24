# Termux Setup Guide

Complete guide for building the Verum Omnis Contradiction Engine APK directly on your Android device using Termux.

## Step 1: Install Termux

Download Termux from F-Droid (NOT Google Play Store):
https://f-droid.org/en/packages/com.termux/

## Step 2: Setup Termux Environment

```bash
# Update packages
pkg update && pkg upgrade -y

# Install required packages
pkg install nodejs-lts -y
pkg install git -y
pkg install python -y
pkg install openssl -y

# Install Expo and EAS CLI
npm install -g expo-cli
npm install -g eas-cli
```

## Step 3: Clone Repository

```bash
# Navigate to home
cd ~

# Clone the project
git clone https://github.com/Liamhigh/android211.git
cd android211
```

## Step 4: Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - React Native and Expo
# - Tesseract.js (OCR)
# - pdf-lib (PDF generation)
# - crypto-js (hashing)
# - Navigation libraries
# - And more...
```

## Step 5: Configure Environment

```bash
# Set Node options for Termux compatibility
export NODE_OPTIONS=--openssl-legacy-provider

# Make it permanent
echo 'export NODE_OPTIONS=--openssl-legacy-provider' >> ~/.bashrc
source ~/.bashrc
```

## Step 6: Test Locally (Optional)

```bash
# Start Expo development server
expo start

# Scan QR code with Expo Go app
# Note: May not work with native modules, proceed to APK build if issues occur
```

## Step 7: Configure EAS Build

```bash
# Configure EAS (creates eas.json if needed)
eas build:configure

# Login to Expo account (create one at expo.dev if needed)
eas login
```

## Step 8: Build APK

```bash
# Build preview APK
eas build -p android --profile preview

# Wait 5-10 minutes for cloud build
# You'll get a download link when complete
```

## Step 9: Install APK

1. Open the download link from EAS in your browser
2. Download the APK
3. Enable "Install from Unknown Sources" if prompted
4. Install the APK
5. Launch Verum Omnis Contradiction Engine!

## Troubleshooting

### "Command not found" errors
```bash
pkg install nodejs-lts git python openssl -y
```

### Metro bundler issues
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### EAS not configured
```bash
eas build:configure
```

### Missing dependencies
```bash
npm install
```

### Build fails
Check:
1. Stable internet connection
2. Expo account is logged in (`eas whoami`)
3. Valid app.json and eas.json
4. No syntax errors in code

## One-Liner Quick Build

```bash
cd ~/android211 && npm install && export NODE_OPTIONS=--openssl-legacy-provider && eas build -p android --profile preview
```

## Building for Production (Play Store)

```bash
# Build AAB for Play Store
eas build -p android --profile production

# Download AAB and upload to Play Console
```

## Notes

- First build may take 10-15 minutes
- Subsequent builds are faster (~5 minutes)
- APK can be shared directly
- AAB is for Play Store only
- All builds happen on Expo's servers
- No need for Android Studio or JDK

## Resources

- Expo Documentation: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- Termux Wiki: https://wiki.termux.com

---

**You're ready to build!** 🚀
