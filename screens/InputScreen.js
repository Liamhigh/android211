import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import VOButton from "../components/VOButton";
import { ThemeContext } from "../theme/ThemeContext";

export default function InputScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const [text, setText] = useState("");
  
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.text }]}>
          Enter Text
        </Text>
        
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.card, 
            color: theme.text 
          }]}
          placeholder="Paste or type content here…"
          placeholderTextColor={theme.textMuted}
          multiline
          value={text}
          onChangeText={setText}
        />
        
        <VOButton 
          title="Analyse" 
          onPress={() => {
            if (text.trim().length === 0) return;
            navigation.navigate("Processing", { text });
          }} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    minHeight: 200,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top"
  }
});
