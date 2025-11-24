import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import VOButton from "../components/VOButton";
import Card from "../components/Card";
import { ThemeContext } from "../theme/ThemeContext";

export default function ResultScreen({ route, navigation }) {
  const theme = useContext(ThemeContext);
  const { text, results } = route.params;
  
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.text }]}>
          Results
        </Text>
        
        <Card>
          <Text style={[styles.score, { color: theme.primaryLight }]}>
            Consistency Score: {results.score}%
          </Text>
        </Card>
        
        <Text style={[styles.section, { color: theme.text }]}>
          Contradictions:
        </Text>
        
        {results.contradictions.length === 0 ? (
          <Card>
            <Text style={{ color: theme.text }}>
              No contradictions detected.
            </Text>
          </Card>
        ) : (
          results.contradictions.map((item, index) => (
            <Card key={index}>
              <Text style={{ color: theme.text }}>{item}</Text>
            </Card>
          ))
        )}
        
        <VOButton 
          title="Generate Sealed PDF" 
          onPress={() => navigation.navigate("PDF", { text, results })} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10
  },
  score: {
    fontSize: 22,
    fontWeight: "bold"
  }
});
