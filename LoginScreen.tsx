import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const storedUsers = await AsyncStorage.getItem("userList");

    if (!storedUsers) {
      Alert.alert("Error", "No user accounts found. Please sign up first.");
      return;
    }

    const users = JSON.parse(storedUsers);

    const match = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!match) {
      Alert.alert("Error", "Invalid username or password!");
      return;
    }

    await AsyncStorage.setItem("currentUser", JSON.stringify(match));

    Alert.alert("Success", "Login Successful!");
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <Image source={require("../assets/images/smarthealth_logo.png")} style={styles.logo} />

          <Text style={styles.heading}>Log In</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Your username"
            placeholderTextColor="#B0C4DE"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#B0C4DE"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.bottomText}>Don't have an account? <Text style={styles.link}>Sign Up</Text></Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, alignItems: "center", backgroundColor: "#001F54",
    paddingVertical: 120,
  },
  logo: { width: 200, height: 200, marginBottom: 10 },
  heading: { fontSize: 26, color: "white", marginBottom: 20 },
  label: { width: "75%", color: "white", marginBottom: 5 },
  input: {
    width: "75%", borderBottomWidth: 1, borderBottomColor: "#ccc",
    marginBottom: 15, paddingVertical: 8, color: "white"
  },
  loginButton: {
    width: "75%", backgroundColor: "#0A2A6B", padding: 14,
    borderRadius: 10, alignItems: "center", marginTop: 20
  },
  loginText: { color: "white", fontSize: 18, fontWeight: "600" },
  bottomText: { color: "white", marginTop: 25 },
  link: { textDecorationLine: "underline", fontWeight: "700" },
});
