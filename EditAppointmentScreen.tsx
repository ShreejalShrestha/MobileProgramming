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
import { ref, update } from "firebase/database";

export default function EditAppointmentScreen({ route, navigation }: any) {
  const { appointment } = route.params;

  const [title, setTitle] = useState(appointment.title);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [note, setNote] = useState(appointment.note || "");

  const saveChanges = async () => {
    if (!title || !date || !time) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const apptRef = ref(db, `appointments/${appointment.id}`);

      await update(apptRef, {
        title,
        date,
        time,
        note,
      });

      Alert.alert("Updated", "Appointment updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Error", "Could not update appointment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Appointment</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Appointment Title"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Time"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.textArea}
        value={note}
        onChangeText={setNote}
        placeholder="Notes (optional)"
        placeholderTextColor="#999"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54", padding: 20 },
  header: { fontSize: 22, color: "white", marginBottom: 20, fontWeight: "700" },
  input: {
    backgroundColor: "#0A2A6B",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: "#0A2A6B",
    color: "white",
    padding: 12,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4DAAFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "white", fontSize: 18, fontWeight: "700" },
});