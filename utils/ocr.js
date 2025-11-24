import { createWorker } from "tesseract.js";
import * as ImageManipulator from "expo-image-manipulator";

export async function runOCR(uri) {
  try {
    // Step 1: Pre-clean image (helps accuracy)
    const cleaned = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1200 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    // Step 2: Create Tesseract Worker
    const worker = await createWorker({
      logger: m => console.log("TESSERACT:", m),
    });
    
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
