import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const correctUsername = "Shreejal";
    const correctPassword = "0113";

    if (Username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Username and password cannot be empty!");
      return;
    }

    if (Username !== correctUsername || password !== correctPassword) {
      Alert.alert("Error", "Invalid username or password!");
      return;
    }

    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.card}>
            <Text style={styles.title}>LOGIN</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={Username}
              
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setUsername("");
                  setPassword("");
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signBtn} onPress={handleLogin}>
                <Text style={styles.signText}>LOGIN</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    paddingVertical: 30,
  },
  card: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "white",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 16,
    color: "#000",
  },
  signBtn: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signText: {
    fontSize: 16,
    color: "white",
  },
});
