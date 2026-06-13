// src/screens/ProfileScreen.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () =>
            navigation.replace("Login"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </Text>
          </View>

          <Text style={styles.name}>
            {user?.name || "User"}
          </Text>

          <Text style={styles.mobile}>
            📱 {user?.mobile}
          </Text>

          <View style={styles.verifyBadge}>
            <Text
              style={styles.verifyText}
            >
              ✓ Verified Account
            </Text>
          </View>
        </View>

        {/* STATS */}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text
              style={styles.statNumber}
            >
              12
            </Text>

            <Text
              style={styles.statLabel}
            >
              Jobs
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text
              style={styles.statNumber}
            >
              4
            </Text>

            <Text
              style={styles.statLabel}
            >
              Active
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text
              style={styles.statNumber}
            >
              18
            </Text>

            <Text
              style={styles.statLabel}
            >
              Workers
            </Text>
          </View>
        </View>

        {/* ACCOUNT DETAILS */}

        <Text style={styles.sectionTitle}>
          Account Information
        </Text>

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
            Account Role
          </Text>

          <Text style={styles.value}>
            {user?.role}
          </Text>
        </View>

        {/* QUICK ACTIONS */}

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "Jobs",
              { user }
            )
          }
        >
          <Text style={styles.menuIcon}>
            📋
          </Text>

          <Text style={styles.menuText}>
            My Jobs
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "Workers",
              { user }
            )
          }
        >
          <Text style={styles.menuIcon}>
            👷
          </Text>

          <Text style={styles.menuText}>
            Find Workers
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
        >
          <Text style={styles.menuIcon}>
            ⚙️
          </Text>

          <Text style={styles.menuText}>
            Settings
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
        >
          <Text style={styles.menuIcon}>
            🎧
          </Text>

          <Text style={styles.menuText}>
            Help & Support
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
        >
          <Text style={styles.menuIcon}>
            ℹ️
          </Text>

          <Text style={styles.menuText}>
            About LabourLink
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* EDIT PROFILE */}

        <TouchableOpacity
          style={styles.editBtn}
        >
          <Text style={styles.editBtnText}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={logout}
        >
          <Text
            style={styles.logoutText}
          >
            Logout
          </Text>
        </TouchableOpacity>

        <View
          style={{ height: 50 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#111827",
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFD400",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111827",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  mobile: {
    color: "#D1D5DB",
    marginTop: 5,
  },

  verifyBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  verifyText: {
    color: "#fff",
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: -25,
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: "#fff",
    width: "28%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  statLabel: {
    color: "#666",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    padding: 16,
    elevation: 2,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 5,
  },

  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  menuIcon: {
    fontSize: 22,
  },

  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
  },

  arrow: {
    fontSize: 24,
    color: "#999",
  },

  editBtn: {
    backgroundColor: "#FFD400",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },

  editBtnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
  },

  logoutBtn: {
    backgroundColor: "#EF4444",
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});