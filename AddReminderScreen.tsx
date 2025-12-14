import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

// Firebase Realtime Database
import { db } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";

export default function AddReminderScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const saveReminder = async () => {
    if (!title || !time) {
      Alert.alert("Error", "Title and time are required.");
      return;
    }

    try {
      // Creating a new unique record in RTDB
      const remindersRef = ref(db, "reminders");
      const newRef = push(remindersRef);

      await set(newRef, {
        id: newRef.key,
        title,
        description,
        time,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Saved", "Reminder added successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not save reminder.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Metformin"
        placeholderTextColor="#B0C4DE"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., After lunch"
        placeholderTextColor="#B0C4DE"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2:30 PM"
        placeholderTextColor="#B0C4DE"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={saveReminder}>
        <Text style={styles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F54",
    padding: 20,
  },
  label: {
    color: "white",
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingVertical: 8,
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
