import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { runContradictionEngine } from "../utils/contradictionEngine";

export default function ProcessingScreen({ route, navigation }) {
  const theme = useContext(ThemeContext);
  const { text } = route.params;
  
  useEffect(() => {
    async function run() {
      const results = await runContradictionEngine(text);
      setTimeout(() => {
        navigation.replace("Result", { text, results });
      }, 1000);
    }
    run();
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primaryLight} />
      <Text style={[styles.text, { color: theme.text }]}>
        AI Forensic Analyst Running…
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginTop: 20,
    fontSize: 16
  }
});
