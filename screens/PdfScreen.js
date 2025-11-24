import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import VOButton from "../components/VOButton";
import { ThemeContext } from "../theme/ThemeContext";
import { generatePDF } from "../utils/pdfGenerator";
import * as Sharing from "expo-sharing";

export default function PdfScreen({ route }) {
  const { text, results } = route.params;
  const theme = useContext(ThemeContext);
  const [pdfUri, setPdfUri] = useState(null);
  
  useEffect(() => {
    async function run() {
      const uri = await generatePDF(text, results);
      setPdfUri(uri);
    }
    run();
  }, []);
  
  async function share() {
    if (pdfUri) {
      await Sharing.shareAsync(pdfUri);
    }
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {!pdfUri ? (
        <>
          <ActivityIndicator size="large" color={theme.primaryLight} />
          <Text style={{ color: theme.textMuted, marginTop: 20 }}>
            Sealing document…
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.done, { color: theme.text }]}>
            PDF Ready
          </Text>
          <VOButton 
            title="Share / Export PDF" 
            onPress={share} 
          />
          <Text style={{ color: theme.textMuted, marginTop: 20 }}>
            This PDF is sealed with SHA-512 + QR.
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  done: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  }
});
