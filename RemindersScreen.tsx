import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RemindersScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.contentBox}>
        <Text style={styles.title}>Today's Reminders</Text>
        <Text style={styles.subtitle}>
          Stay on track with your daily medicines, health checks, and self-care tasks.
        </Text>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No tasks added yet</Text>
          <Text style={styles.emptySubtitle}>You can add reminders soon!</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  contentBox: {
    marginTop: 40,  
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  emptyCard: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "85%",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#777",
  },
});
