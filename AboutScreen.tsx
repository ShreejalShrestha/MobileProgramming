import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.subtitle}>
        Learn more about the Smart Health Reminder app and its purpose.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>No info available</Text>
        <Text style={styles.cardSubtitle}>
          More details will be added soon!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#001F54",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "white",
  },

  subtitle: {
    textAlign: "center",
    color: "#B0C4DE",
    marginBottom: 25,
  },

  card: {
    width: "90%",
    backgroundColor: "#0A2A6B",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  cardSubtitle: {
    marginTop: 5,
    color: "#B0C4DE",
  },
});
