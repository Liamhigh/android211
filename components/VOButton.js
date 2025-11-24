import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

export default function VOButton({ title, onPress }) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity 
      style={[styles.btn, { backgroundColor: theme.primary }]} 
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 12,
    width: "100%"
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600"
  }
});
