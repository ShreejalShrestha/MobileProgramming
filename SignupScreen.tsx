import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    if (!accepted) {
      Alert.alert("Error", "You must accept the Terms and Privacy Policy.");
      return;
    }

    let userList: any = await AsyncStorage.getItem("userList");
    userList = userList ? JSON.parse(userList) : [];

    if (userList.some((u: any) => u.username === username)) {
      Alert.alert("Error", "Username already exists. Try another.");
      return;
    }

    userList.push({ username, email, password });

    await AsyncStorage.setItem("userList", JSON.stringify(userList));

    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Sign Up</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor="#B0C4DE"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#B0C4DE"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            secureTextEntry
            placeholderTextColor="#B0C4DE"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAccepted(!accepted)}>
            <Text style={styles.checkbox}>{accepted ? "☑" : "☐"}</Text>
            <Text style={styles.checkboxText}>I agree to Terms & Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.bottomText}>Already have an account? <Text style={styles.signIn}>Login</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#001F54", flexGrow: 1, padding: 40 },
  heading: { fontSize: 28, color: "white", marginBottom: 30 },
  label: { color: "white", fontSize: 14, marginBottom: 5 },
  input: {
    borderBottomWidth: 1, borderBottomColor: "#ccc", color: "white",
    marginBottom: 15, paddingVertical: 8, fontSize: 16
  },
  checkboxRow: { flexDirection: "row", marginTop: 15, alignItems: "center" },
  checkbox: { color: "white", fontSize: 22, marginRight: 10 },
  checkboxText: { color: "white", fontSize: 14 },
  button: {
    backgroundColor: "#0A2A6B", padding: 14, borderRadius: 10,
    alignItems: "center", marginTop: 40
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  bottomText: { color: "white", marginTop: 30, textAlign: "center" },
  signIn: { textDecorationLine: "underline", fontWeight: "700" },
});
