import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem("currentUser");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      };

      loadUser();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.info}>No user logged in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54", padding: 30 },
  title: { color: "white", fontSize: 28, fontWeight: "700", marginBottom: 25 },
  card: { backgroundColor: "#0A2A6B", padding: 20, borderRadius: 14 },
  label: { color: "#B0C4DE", fontSize: 14, marginTop: 10 },
  value: { color: "white", fontSize: 18, marginBottom: 10 },
  editButton: {
    backgroundColor: "#4DAAFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  editText: { color: "white", fontSize: 18, fontWeight: "700" },
  logoutButton: {
    backgroundColor: "#FF5C5C",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  logoutText: { color: "white", fontSize: 18, fontWeight: "700" },
  info: { color: "white", fontSize: 18, marginBottom: 15 },
});
