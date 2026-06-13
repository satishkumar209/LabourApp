import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function DashboardScreen({
  route,
  navigation,
}) {
  const user = route?.params?.user;

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>User data not found</Text>
      </View>
    );
  }

  const services = [
    {
      icon: "👷",
      title: "Labour",
    },
    {
      icon: "⚡",
      title: "Electrician",
    },
    {
      icon: "🔧",
      title: "Plumber",
    },
    {
      icon: "🎨",
      title: "Painter",
    },
    {
      icon: "🧱",
      title: "Mason",
    },
    {
      icon: "🪚",
      title: "Carpenter",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello 👋
            </Text>

            <Text style={styles.userName}>
              {user.name}
            </Text>

            <Text style={styles.subtitle}>
              Find Skilled Workers Near You
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileCircle}
            onPress={() =>
              navigation.navigate(
                "Profile",
                { user }
              )
            }
          >
            <Text style={{ fontSize: 24 }}>
              👤
            </Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search workers, services..."
            placeholderTextColor="#999"
            style={styles.search}
          />
        </View>

        {/* ACCOUNT CARD */}

        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>
            LabourLink Premium
          </Text>

          <Text style={styles.accountText}>
            📱 {user.mobile}
          </Text>

          <Text style={styles.accountText}>
            👤 {user.role}
          </Text>
        </View>

        {/* STATS */}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Workers
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              4
            </Text>

            <Text style={styles.statLabel}>
              Jobs
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              2
            </Text>

            <Text style={styles.statLabel}>
              Active
            </Text>
          </View>
        </View>

        {/* SERVICES */}

        <Text style={styles.sectionTitle}>
          Popular Services
        </Text>

        <View style={styles.grid}>
          {services.map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() =>
                  navigation.navigate(
                    "Workers",
                    { user }
                  )
                }
              >
                <Text
                  style={
                    styles.serviceIcon
                  }
                >
                  {item.icon}
                </Text>

                <Text
                  style={
                    styles.serviceText
                  }
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* BANNER */}

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Need Workers Fast?
          </Text>

          <Text style={styles.bannerText}>
            Post a job and get workers
            instantly.
          </Text>

          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() =>
              navigation.navigate(
                "Jobs",
                { user }
              )
            }
          >
            <Text
              style={
                styles.bannerBtnText
              }
            >
              Post Job Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVITY */}

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

      {/* FLOATING BUTTON */}

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() =>
          navigation.navigate(
            "Jobs",
            { user }
          )
        }
      >
        <Text style={styles.floatingText}>
          +
        </Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.activeNav}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#111827",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    color: "#fff",
    fontSize: 16,
  },

  userName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#D1D5DB",
    marginTop: 4,
  },

  profileCircle: {
    backgroundColor: "#FFD400",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    marginHorizontal: 20,
    marginTop: -20,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 55,
    paddingHorizontal: 20,
    elevation: 4,
  },

  accountCard: {
    backgroundColor: "#FFD400",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  accountTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  accountText: {
    fontSize: 15,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: "#fff",
    width: "28%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
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
    backgroundColor: "#fff",
    width: "42%",
    paddingVertical: 25,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  serviceIcon: {
    fontSize: 34,
    marginBottom: 10,
  },

  serviceText: {
    fontWeight: "600",
  },

  banner: {
    margin: 20,
    backgroundColor: "#0F172A",
    borderRadius: 20,
    padding: 20,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#D1D5DB",
    marginTop: 10,
  },

  bannerBtn: {
    backgroundColor: "#FFD400",
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  bannerBtnText: {
    fontWeight: "bold",
  },

  activityCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
  },

  floatingBtn: {
    position: "absolute",
    bottom: 85,
    right: 20,
    backgroundColor: "#FFD400",
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  floatingText: {
    fontSize: 35,
    fontWeight: "bold",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  activeNav: {
    color: "#FFD400",
    fontWeight: "bold",
  },

  navText: {
    color: "#555",
    fontWeight: "600",
  },
});