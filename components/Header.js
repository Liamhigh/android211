import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/logo.png")} 
        style={styles.logo} 
      />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  }
});
