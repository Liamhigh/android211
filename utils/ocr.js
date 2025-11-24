import { createWorker } from "tesseract.js";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export async function runOCR(uri) {
  try {
    // Step 1: Pre-clean image (helps accuracy)
    const cleaned = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1200 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    // Step 2: Create Tesseract Worker with LOCAL configuration for offline use
    // Note: Language data should be bundled in assets/tesseract/ directory
    // Tesseract.js will cache the language file locally after first use
    const worker = await createWorker({
      logger: m => console.log("TESSERACT:", m),
      // Cache language data locally for offline operation
      cachePath: FileSystem.cacheDirectory,
      // Fallback to bundled assets if available
      langPath: `${FileSystem.bundleDirectory}assets/tesseract`,
    });
    
    // Load language from local cache or bundled assets (offline-first approach)
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    // Step 3: Run OCR
    const { data } = await worker.recognize(cleaned.uri);
    await worker.terminate();

    // Step 4: Clean text
    const cleanedText = data.text
      .replace(/\n+/g, " ")
      .replace(/\s\s+/g, " ")
      .trim();

    return cleanedText.length > 0 ? cleanedText : "No text detected.";
  } catch (e) {
    console.error("OCR ERROR:", e);
    return "OCR failed. Please try a clearer image.";
  }
}
