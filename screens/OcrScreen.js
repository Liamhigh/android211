import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import VOButton from "../components/VOButton";
import { ThemeContext } from "../theme/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { runOCR } from "../utils/ocr";

export default function OcrScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [processing, setProcessing] = useState(false);
  
  async function selectImage(type) {
    try {
      const fn = type === "camera" 
        ? ImagePicker.launchCameraAsync 
        : ImagePicker.launchImageLibraryAsync;
      
      const result = await fn({ quality: 1 });
      
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        extract(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to access camera/gallery");
    }
  }
  
  async function extract(uri) {
    setProcessing(true);
    setOcrText("Extracting text…");
    const text = await runOCR(uri);
    setOcrText(text);
    setProcessing(false);
  }
  
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.text }]}>
          Scan Document
        </Text>
        
        {image && (
          <Image 
            source={{ uri: image }} 
            style={styles.preview} 
          />
        )}
        
        <VOButton 
          title="Take Photo" 
          onPress={() => selectImage("camera")} 
        />
        <VOButton 
          title="Upload Image" 
          onPress={() => selectImage("gallery")} 
        />
        
        {ocrText.length > 0 && (
          <>
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={{ color: theme.text }}>{ocrText}</Text>
            </View>
            
            {!processing && (
              <VOButton 
                title="Analyse Extracted Text" 
                onPress={() => navigation.navigate("Processing", { text: ocrText })} 
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20
  },
  title: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: "bold"
  },
  preview: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
  },
});
