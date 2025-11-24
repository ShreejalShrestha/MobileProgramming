import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <TouchableOpacity
        style={styles.healthButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.healthText}>Show Health Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Reminders")}
      >
        <Text style={styles.navText}>Go to Reminders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Family")}
      >
        <Text style={styles.navText}>Go to Family</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.navText}>Go to About</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Health Information</Text>

            <TouchableOpacity
              style={[styles.navButton, { marginTop: 20 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.navText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 30,
  },
  healthButton: {
    backgroundColor: "green",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  healthText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  navButton: {
    width: 200,
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
    marginVertical: 8,
  },
  navText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    width: "80%",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
