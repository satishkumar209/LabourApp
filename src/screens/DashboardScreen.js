import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function DashboardScreen({
  route,
  navigation,
}) {
  const user = route?.params?.user;

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>
          User data not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcome}>
            Hello, {user.name || "User"} 👋
          </Text>

          <Text style={styles.subText}>
            Welcome to LabourLink
          </Text>
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search workers..."
          placeholderTextColor="#777"
          style={styles.search}
        />

        {/* Account Card */}
        <View style={styles.accountCard}>
          <Text style={styles.cardTitle}>
            LabourLink Account
          </Text>

          <Text style={styles.cardText}>
            📱 Mobile: {user.mobile}
          </Text>

          <Text style={styles.cardText}>
            👤 Role: {user.role}
          </Text>
        </View>

        {/* Services */}
        <Text style={styles.sectionTitle}>
          Popular Services
        </Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate(
                "Workers",
                { user }
              )
            }
          >
            <Text style={styles.icon}>
              👷
            </Text>

            <Text style={styles.serviceText}>
              Labour
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate(
                "Workers",
                { user }
              )
            }
          >
            <Text style={styles.icon}>
              ⚡
            </Text>

            <Text style={styles.serviceText}>
              Electrician
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate(
                "Workers",
                { user }
              )
            }
          >
            <Text style={styles.icon}>
              🔧
            </Text>

            <Text style={styles.serviceText}>
              Plumber
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate(
                "Workers",
                { user }
              )
            }
          >
            <Text style={styles.icon}>
              🎨
            </Text>

            <Text style={styles.serviceText}>
              Painter
            </Text>
          </TouchableOpacity>
        </View>

        {/* Job Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Need Skilled Workers?
          </Text>

          <Text style={styles.bannerText}>
            Post a job and hire instantly.
          </Text>

          <TouchableOpacity
            style={styles.postBtn}
            onPress={() =>
              navigation.navigate(
                "Jobs",
                { user }
              )
            }
          >
            <Text style={styles.postBtnText}>
              Post Job
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity */}
        <Text style={styles.sectionTitle}>
          Recent Activity
        </Text>

        <View style={styles.activityCard}>
          <Text>
            🚀 Welcome to LabourLink
          </Text>
        </View>

        <View style={styles.activityCard}>
          <Text>
            👷 Browse verified workers
          </Text>
        </View>

        <View style={styles.activityCard}>
          <Text>
            📋 Post your first job
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.navText}>
            🏠 Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Workers",
              { user }
            )
          }
        >
          <Text style={styles.navText}>
            👷 Workers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Jobs",
              { user }
            )
          }
        >
          <Text style={styles.navText}>
            📋 Jobs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Profile",
              { user }
            )
          }
        >
          <Text style={styles.navText}>
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subText: {
    color: "#6B7280",
    marginTop: 4,
  },

  search: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    elevation: 2,
  },

  accountCard: {
    backgroundColor: "#FFD400",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 15,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  serviceCard: {
    width: "42%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  serviceText: {
    fontWeight: "600",
    fontSize: 15,
  },

  banner: {
    backgroundColor: "#0F172A",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#ddd",
    marginTop: 8,
  },

  postBtn: {
    backgroundColor: "#FFD400",
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  postBtnText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  activityCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  navText: {
    fontWeight: "600",
    fontSize: 14,
  },
});