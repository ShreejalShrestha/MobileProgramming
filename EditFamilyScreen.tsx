import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "../firebaseConfig";
import { ref, update } from "firebase/database";

export default function EditFamilyScreen({ route, navigation }: any) {
  const { member } = route.params;

  if (!member) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>❌ No family member received.</Text>
      </View>
    );
  }

  const [name, setName] = useState(member.name);
  const [relation, setRelation] = useState(member.relation);
  const [age, setAge] = useState(String(member.age));
  const [phone, setPhone] = useState(member.phone);
  const [gender, setGender] = useState(member.gender);

  const saveChanges = async () => {
    try {
      const memberRef = ref(db, `familyMembers/${member.id}`);

      await update(memberRef, {
        name,
        relation,
        age,
        phone,
        gender,
        id: member.id, 
      });

      Alert.alert("Success", "Family member updated!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Could not update member.");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Family Member</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={relation} onChangeText={setRelation} />
      <TextInput style={styles.input} value={age} onChangeText={setAge} />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F54", padding: 20 },
  title: { fontSize: 22, color: "white", marginBottom: 20, fontWeight: "700" },
  input: {
    backgroundColor: "#0A2A6B",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    color: "white",
  },
  saveButton: {
    backgroundColor: "#4DAAFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "white", fontSize: 18, fontWeight: "700" },
  topHeader: {
  backgroundColor: "#001F54",
  paddingTop: 20,
  paddingBottom: 15,
  paddingHorizontal: 20,
},
headerTitle: {
  color: "#001F54",
  fontSize: 22,
  fontWeight: "700",
},
});
