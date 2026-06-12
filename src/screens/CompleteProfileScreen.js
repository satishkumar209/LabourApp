import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import axios from "axios";

export default function CompleteProfileScreen({
  route,
  navigation,
}) {
  const { mobile } = route.params;

  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");

  const saveProfile = async () => {
    try {
      const res = await axios.post(
        "http://192.168.1.37:5000/api/auth/complete-profile",
        {
          mobile,
          name,
          role,
        }
      );

      navigation.replace(
        "Dashboard",
        {
          user: res.data.user,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Complete Profile
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
      >
        <Text style={styles.text}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FACC15",
    padding: 15,
    borderRadius: 10,
  },

  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});