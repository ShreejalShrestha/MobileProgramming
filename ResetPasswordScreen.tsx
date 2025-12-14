import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");

  const reset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Reset link sent to your email.");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54", padding: 20 },
  title: { color: "white", fontSize: 26, marginBottom: 20 },
  input: {
    backgroundColor: "#0A2A6B",
    padding: 12,
    color: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#4DAAFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  resetText: { color: "white", fontSize: 18, fontWeight: "700" },
});
