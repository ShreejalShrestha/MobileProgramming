import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Realtime Database
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function HomeScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [reminders, setReminders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const u = await AsyncStorage.getItem("userData");
      if (u) setUsername(JSON.parse(u).username);
    };

    loadUser();

    // LIVE REMINDERS LISTEN
    const remindersRef = ref(db, "reminders");
    const unsubReminders = onValue(remindersRef, (snapshot) => {
      if (snapshot.exists()) {
        setReminders(Object.values(snapshot.val()));
      } else {
        setReminders([]);
      }
    });

    // LIVE APPOINTMENTS LISTEN
    const appointmentsRef = ref(db, "appointments");
    const unsubAppointments = onValue(appointmentsRef, (snapshot) => {
      if (snapshot.exists()) {
        setAppointments(Object.values(snapshot.val()));
      } else {
        setAppointments([]);
      }
    });

    return () => {
      unsubReminders();
      unsubAppointments();
    };
  }, []);

  const topThree = reminders.slice(0, 3);

  return (
    <View style={{ flex: 1, backgroundColor: "#001F54" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.headerBox}>
          <Text style={styles.welcome}>Welcome back 👋</Text>
          <Text style={styles.subtitle}>Stay healthy and consistent today!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          <Text style={styles.cardText}>💊 Medications due: {reminders.length}</Text>
          <Text style={styles.cardText}>🩺 Appointments: {appointments.length}</Text>
          <Text style={styles.cardText}>⏳ Missed reminders: {reminders.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Reminders</Text>
          {topThree.length === 0 ? (
            <Text style={styles.cardSub}>No reminders yet.</Text>
          ) : (
            topThree.map((r, i) => (
              <Text key={i} style={styles.cardText}>
                • {r.title} — {r.time}
              </Text>
            ))
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("AddReminder")}>
            <Text style={styles.buttonText}>Add Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("AddFamily")}>
            <Text style={styles.buttonText}>Add Family</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("AddAppointment")}>
            <Text style={styles.buttonText}>Add Appointment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Tip 💡</Text>
          <Text style={styles.cardSub}>Drink 8 glasses of water today.</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navItem}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Reminders")}>
          <Text style={styles.navItem}>Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Family")}>
          <Text style={styles.navItem}>Family</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text style={styles.navItem}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.navItem}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    padding: 20,
    marginTop: 20,
  },
  welcome: { color: "white", fontSize: 26, fontWeight: "700" },
  subtitle: { color: "#B0C4DE", marginTop: 5 },

  card: {
    backgroundColor: "#0A2A6B",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 14,
  },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  cardText: { color: "#DDE6FF", marginTop: 6 },
  cardSub: { color: "#B0C4DE", marginTop: 6 },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  smallButton: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 14,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },

  bottomNav: {
    height: 100,
    backgroundColor: "#001540",
    borderTopWidth: 1,
    borderTopColor: "#0A2A6B",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { color: "white", fontSize: 14 },
});
