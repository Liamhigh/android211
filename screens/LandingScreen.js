import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import VOButton from "../components/VOButton";
import { ThemeContext } from "../theme/ThemeContext";

export default function LandingScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Image 
          source={require("../assets/logo.png")} 
          style={styles.logo} 
        />
        <Text style={[styles.title, { color: theme.text }]}>
          Verum Omnis
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Contradiction Engine v5.2.6
        </Text>
        
        <VOButton 
          title="Analyse Text" 
          onPress={() => navigation.navigate("Input")} 
        />
        <VOButton 
          title="Scan Document (OCR)" 
          onPress={() => navigation.navigate("OCR")} 
        />
        
        <Text style={[styles.footer, { color: theme.textMuted }]}>
          All processing is local. No data leaves your device.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    textAlign: "center",
  }
});
