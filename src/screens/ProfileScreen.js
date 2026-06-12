// src/screens/ProfileScreen.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function ProfileScreen({
  route,
  navigation,
}) {
  const user = route?.params?.user;

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Logout",
          onPress: () =>
            navigation.replace("Login"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.avatar}>
          👤
        </Text>

        <Text style={styles.name}>
          {user?.name || "User"}
        </Text>

        <Text style={styles.mobile}>
          {user?.mobile}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Full Name
        </Text>

        <Text style={styles.value}>
          {user?.name}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Mobile Number
        </Text>

        <Text style={styles.value}>
          {user?.mobile}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Role
        </Text>

        <Text style={styles.value}>
          {user?.role}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  profileCard: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    fontSize: 70,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  mobile: {
    color: "#666",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  label: {
    color: "#666",
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },

  logoutBtn: {
    backgroundColor: "#FFD400",
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },

  logoutText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});