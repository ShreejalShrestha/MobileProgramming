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

export default function AddFamilyScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const saveFamily = async () => {
    if (!name || !relation || !age || !phone || !gender) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const familyRef = ref(db, "familyMembers");
      const newRef = push(familyRef);

      await set(newRef, {
        id: newRef.key,
        name,
        relation,
        age,
        phone,
        gender,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Family member added!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.log("Save error:", e);
      Alert.alert("Error", "Could not save family member.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Family Member</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor="#B0C4DE"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Relation</Text>
      <TextInput
        style={styles.input}
        placeholder="Mother, Father, etc."
        placeholderTextColor="#B0C4DE"
        value={relation}
        onChangeText={setRelation}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#B0C4DE"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="98XXXXXXXX"
        placeholderTextColor="#B0C4DE"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Male / Female / Other"
        placeholderTextColor="#B0C4DE"
        value={gender}
        onChangeText={setGender}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveFamily}>
        <Text style={styles.saveText}>Save</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 30,
  },
  label: {
    color: "white",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderBottomColor: "#B0C4DE",
    borderBottomWidth: 1,
    color: "white",
    paddingVertical: 6,
    marginBottom: 25,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
