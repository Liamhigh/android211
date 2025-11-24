import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

export default function Card({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15
  }
});
