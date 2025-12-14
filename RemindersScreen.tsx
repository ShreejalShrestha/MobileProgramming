import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Realtime Database
import { db } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

export default function RemindersScreen({ navigation }: any) {
  const [reminders, setReminders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Load Reminders in Firebase
    const remindersRef = ref(db, "reminders");
    const unsubscribeRem = onValue(remindersRef, (snapshot) => {
      if (snapshot.exists()) {
        setReminders(
          Object.entries(snapshot.val()).map(([id, item]: any) => ({
            id,
            ...item,
          }))
        );
      } else {
        setReminders([]);
      }
    });

    // Load Appointments in Firebase
    const apptRef = ref(db, "appointments");
    const unsubscribeAppt = onValue(apptRef, (snapshot) => {
      if (snapshot.exists()) {
        setAppointments(
          Object.entries(snapshot.val()).map(([id, item]: any) => ({
            id,
            ...item,
          }))
        );
      } else {
        setAppointments([]);
      }
    });

    return () => {
      unsubscribeRem();
      unsubscribeAppt();
    };
  }, []);

  // Delete reminder from Firebase
  const deleteMedication = async (itemId: string) => {
    try {
      await remove(ref(db, `reminders/${itemId}`));
    } catch (error) {
      console.log("Error deleting medication:", error);
    }
  };

  // Delete appointment from Firebase
  const deleteAppointment = async (id: string) => {
    try {
      await remove(ref(db, `appointments/${id}`));
    } catch (error) {
      console.log("Error deleting appointment:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>Today's Reminders</Text>
        <Text style={styles.subtitle}>
          Stay on track with your daily medicines, health checks, and self-care tasks.
        </Text>
      </View>

      {/* MEDICATIONS SECTION */}
      <Text style={styles.sectionTitle}>Medications</Text>

      {reminders.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No medications added</Text>
          <Text style={styles.emptySubtitle}>You can add medication reminders soon.</Text>
        </View>
      ) : (
        <View style={styles.listCard}>
          {reminders.map((item, index) => (
            <View key={item.id || index} style={styles.itemBox}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>

              {item.description ? <Text style={styles.itemNote}>{item.description}</Text> : null}

              <View style={{ flexDirection: "row", gap: 20, marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditReminder", {
                      reminder: item,
                    })
                  }
                >
                  <Text style={{ color: "#4DAAFF", fontWeight: "600" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteMedication(item.id)}>
                  <Text style={{ color: "#FF6B6B", fontWeight: "600" }}>Delete</Text>
                </TouchableOpacity>
              </View>

              {index !== reminders.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      )}

      {/* APPOINTMENTS SECTION */}
      <Text style={styles.sectionTitle}>Appointments</Text>

      {appointments.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No appointments added</Text>
          <Text style={styles.emptySubtitle}>You can add appointments soon!</Text>
        </View>
      ) : (
        <View style={styles.listCard}>
          {appointments.map((item, index) => (
            <View key={item.id || index} style={styles.itemBox}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemTime}>
                {item.date} — {item.time}
              </Text>

              {item.note ? <Text style={styles.itemNote}>{item.note}</Text> : null}

              <View style={{ flexDirection: "row", gap: 20, marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditAppointment", {
                      appointment: item,
                    })
                  }
                >
                  <Text style={{ color: "#4DAAFF", fontWeight: "600" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteAppointment(item.id)}>
                  <Text style={{ color: "#FF6B6B", fontWeight: "600" }}>Delete</Text>
                </TouchableOpacity>
              </View>

              {index !== appointments.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54" },
  contentBox: { marginTop: 40, alignItems: "center", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "white", textAlign: "center" },
  subtitle: { fontSize: 15, color: "#B0C4DE", textAlign: "center", marginBottom: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  listCard: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  itemBox: { marginBottom: 10 },
  itemTitle: { color: "white", fontSize: 17, fontWeight: "700" },
  itemTime: { color: "#DDE6FF", fontSize: 15, marginTop: 2 },
  itemNote: { color: "#B0C4DE", marginTop: 2, marginBottom: 8 },
  divider: { height: 1, backgroundColor: "#123A7C", marginVertical: 8 },
  emptyCard: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: "white" },
  emptySubtitle: { fontSize: 14, color: "#B0C4DE", marginTop: 5 },
});
