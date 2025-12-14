import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

// Firebase
import { db } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";

export default function AddAppointmentScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const saveAppointment = async () => {
    if (!title || !date || !time) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      const appointmentsRef = ref(db, "appointments");
      const newRef = push(appointmentsRef);

      await set(newRef, {
        id: newRef.key,
        title,
        date,
        time,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Appointment added!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("Save error:", error);
      Alert.alert("Error", "Could not save appointment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Appointment</Text>

      <Text style={styles.label}>Appointment Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor Visit, Check-up, etc."
        placeholderTextColor="#B0C4DE"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#B0C4DE"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="2:30 PM"
        placeholderTextColor="#B0C4DE"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={saveAppointment}>
        <Text style={styles.buttonText}>Save Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F54",
    padding: 25,
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingVertical: 8,
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
