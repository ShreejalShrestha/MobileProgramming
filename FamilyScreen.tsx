import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Members</Text>

      <Text style={styles.subtitle}>
        Manage important family health information and emergency contacts.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>No family members added</Text>
        <Text style={styles.cardSubtitle}>
          You can add family profiles soon!
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
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    marginTop: 5,
    color: "#777",
  },
});
