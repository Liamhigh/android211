import * as FileSystem from "expo-file-system";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { sha512 } from "./hash";

export async function generatePDF(text, results) {
  // Build forensic hash (chain of custody)
  const forensicHash = sha512(
    text + JSON.stringify(results.contradictions) + results.score
  );
  
  // Short-hand version for metadata
  const truncatedHash = forensicHash.substring(0, 32);

  // Create PDF
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  // Header text
  page.drawText("VERUM OMNIS – CONTRADICTION REPORT", {
    x: 40,
    y: height - 80,
    size: 16,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText("Forensic Seal v5.2.6", {
    x: 40,
    y: height - 100,
    size: 11,
    font,
    color: rgb(0.75, 0.82, 1),
  });

  // Contradiction Score
  page.drawText(`Consistency Score: ${results.score}%`, {
    x: 40,
    y: height - 130,
    size: 13,
    font,
    color: rgb(0.75, 0.82, 1),
  });

  // Contradictions list
  let y = height - 160;
  if (results.contradictions.length === 0) {
    page.drawText("No contradictions detected.", {
      x: 40,
      y,
      size: 12,
      font,
      color: rgb(1, 1, 1),
    });
  } else {
    for (let c of results.contradictions) {
      if (y < 150) break; // stop overflow
      
      // Wrap text at word boundaries
      const maxWidth = 75; // characters per line
      let words = c.split(' ');
      let currentLine = '';
      
      for (let word of words) {
        if ((currentLine + word).length > maxWidth && currentLine.length > 0) {
          page.drawText("• " + currentLine.trim(), {
            x: 40,
            y,
            size: 10,
            font,
            color: rgb(1, 1, 1),
          });
          y -= 15;
          currentLine = word + ' ';
          if (y < 150) break;
        } else {
          currentLine += word + ' ';
        }
      }
      
      // Draw remaining text
      if (currentLine.trim().length > 0 && y >= 150) {
        const prefix = currentLine === c ? "• " : "  ";
        page.drawText(prefix + currentLine.trim(), {
          x: 40,
          y,
          size: 10,
          font,
          color: rgb(1, 1, 1),
        });
      }
      
      y -= 20; // Extra space between contradictions
    }
  }

  // Forensic hash
  page.drawText("SHA-512 Forensic Hash:", {
    x: 40,
    y: 120,
    size: 10,
    font,
    color: rgb(1, 1, 1),
  });
  
  page.drawText(forensicHash.substring(0, 90) + "...", {
    x: 40,
    y: 105,
    size: 8,
    font,
    color: rgb(0.7, 0.7, 0.7),
  });

  // Footer + metadata
  const timestamp = new Date().toISOString();
  page.drawText(`Generated: ${timestamp}`, {
    x: 40,
    y: 60,
    size: 8,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText("✔ Patent Pending – Verum Omnis", {
    x: 40,
    y: 45,
    size: 9,
    font,
    color: rgb(0.75, 0.82, 1),
  });

  // QR metadata text
  page.drawText(`QR Data: ${truncatedHash}`, {
    x: width - 200,
    y: 60,
    size: 7,
    font,
    color: rgb(0.7, 0.7, 0.7),
  });

  // Save PDF
  const pdfBytes = await pdf.save();
  const fileUri = FileSystem.documentDirectory + "VerumContradictionReport.pdf";
  
  // Convert Uint8Array to base64 string without using Buffer
  const base64 = btoa(
    pdfBytes.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  
  await FileSystem.writeAsStringAsync(
    fileUri, 
    base64,
    { encoding: FileSystem.EncodingType.Base64 }
  );

  return fileUri;
}
