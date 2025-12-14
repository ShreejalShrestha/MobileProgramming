import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { db } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

export default function FamilyScreen({ navigation }: any) {
  const [family, setFamily] = useState<any[]>([]);

  useEffect(() => {
    const familyRef = ref(db, "familyMembers");

    // Live listener to Firebase
    const unsubscribe = onValue(familyRef, (snapshot) => {
      if (snapshot.exists()) {
        setFamily(Object.values(snapshot.val()));
      } else {
        setFamily([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Delete family member
  const deleteFamily = async (id: string) => {
    try {
      await remove(ref(db, `familyMembers/${id}`));
    } catch (e) {
      console.log("Error deleting family member:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Members</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {family.length === 0 ? (
          <Text style={styles.emptyText}>No family members added yet.</Text>
        ) : (
          family.map((item, index) => (
            <View key={item.id || index} style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.relation}>{item.relation}</Text>
              <Text style={styles.detail}>Age: {item.age}</Text>
              <Text style={styles.detail}>Phone: {item.phone}</Text>
              <Text style={styles.detail}>Gender: {item.gender}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditFamily", { member: item, index })}>
                  <Text style={styles.editBtn}>Edit</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => deleteFamily(item.id)}>
                  <Text style={styles.deleteBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddFamily")}
      >
        <Text style={styles.addText}>Add Family Member</Text>
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
    marginBottom: 20,
  },
  emptyText: {
    color: "#B0C4DE",
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#0A2A6B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  relation: {
    color: "#B0C4DE",
    marginTop: 4,
    fontSize: 16,
  },
  detail: {
    color: "#DDE6FF",
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
  editBtn: {
    color: "#4DAAFF",
    fontWeight: "600",
  },
  deleteBtn: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
  addBtn: {
    backgroundColor: "#0A2A6B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  addText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
