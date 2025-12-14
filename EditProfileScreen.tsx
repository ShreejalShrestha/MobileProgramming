import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("currentUser");
      if (stored) {
        const u = JSON.parse(stored);
        setUsername(u.username);
        setEmail(u.email);
      }
    };
    loadUser();
  }, []);

  const saveChanges = async () => {
    if (!username || !email) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      // Load all users
      const userListJSON = await AsyncStorage.getItem("userList");
      let userList = userListJSON ? JSON.parse(userListJSON) : [];

      // Load current user
      const currentUserJSON = await AsyncStorage.getItem("currentUser");
      const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;

      // Update user in list
      userList = userList.map((u: any) =>
        u.username === currentUser.username ? { ...u, username, email } : u
      );

      // Save updated user list
      await AsyncStorage.setItem("userList", JSON.stringify(userList));

      // Save updated current user
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify({ username, email, password: currentUser.password })
      );

      Alert.alert("Success", "Profile updated!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54", padding: 20 },
  title: { color: "white", fontSize: 28, marginBottom: 20, fontWeight: "700" },
  input: {
    backgroundColor: "#0A2A6B",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: "white",
  },
  saveButton: {
    backgroundColor: "#4DAAFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "white", fontSize: 18, fontWeight: "700" },
});
