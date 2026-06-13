// src/screens/WorkersScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Linking,
} from "react-native";

const workersData = [
  {
    id: "1",
    name: "Raj Kumar",
    profession: "Electrician",
    rating: 4.8,
    experience: "5 Years",
    available: true,
    mobile: "9876543210",
  },
  {
    id: "2",
    name: "Amit Sharma",
    profession: "Plumber",
    rating: 4.7,
    experience: "7 Years",
    available: true,
    mobile: "9876543211",
  },
  {
    id: "3",
    name: "Sunil Kumar",
    profession: "Painter",
    rating: 4.6,
    experience: "4 Years",
    available: false,
    mobile: "9876543212",
  },
  {
    id: "4",
    name: "Ravi Singh",
    profession: "Labour",
    rating: 4.9,
    experience: "8 Years",
    available: true,
    mobile: "9876543213",
  },
];

export default function WorkersScreen({
  navigation,
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Electrician",
    "Plumber",
    "Painter",
    "Labour",
  ];

  const filteredWorkers =
    workersData.filter((worker) => {
      const matchSearch =
        worker.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All"
          ? true
          : worker.profession ===
            selectedCategory;

      return (
        matchSearch &&
        matchCategory
      );
    });

  const callWorker = (mobile) => {
    Linking.openURL(`tel:${mobile}`);
  };

  const renderWorker = ({
    item,
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.workerCard}
    >
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0)}
          </Text>
        </View>

        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>
            {item.name}
          </Text>

          <Text style={styles.profession}>
            {item.profession}
          </Text>

          <Text style={styles.rating}>
            ⭐ {item.rating}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.available
                  ? "#10B981"
                  : "#EF4444",
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.available
              ? "Available"
              : "Busy"}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>
          🛠 Experience:
          {" "}
          {item.experience}
        </Text>

        <Text style={styles.detailText}>
          📞 {item.mobile}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() =>
            callWorker(item.mobile)
          }
        >
          <Text style={styles.btnText}>
            Call
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hireBtn}
          onPress={() =>
            navigation.navigate(
              "Jobs"
            )
          }
        >
          <Text style={styles.hireText}>
            Hire Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={renderWorker}
        showsVerticalScrollIndicator={
          false
        }
        ListHeaderComponent={
          <>
            {/* Header */}

            <View
              style={styles.header}
            >
              <Text
                style={
                  styles.title
                }
              >
                Find Skilled Workers
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                Hire trusted workers
                near you
              </Text>
            </View>

            {/* Search */}

            <TextInput
              style={
                styles.search
              }
              placeholder="Search workers..."
              value={search}
              onChangeText={
                setSearch
              }
            />

            {/* Categories */}

            <View
              style={
                styles.categoryContainer
              }
            >
              <FlatList
                horizontal
                data={
                  categories
                }
                keyExtractor={(
                  item
                ) => item}
                showsHorizontalScrollIndicator={
                  false
                }
                renderItem={({
                  item,
                }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryChip,
                      selectedCategory ===
                        item &&
                        styles.activeCategoryChip,
                    ]}
                    onPress={() =>
                      setSelectedCategory(
                        item
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedCategory ===
                          item &&
                          styles.activeCategoryChipText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F5F7FB",
    },

    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      marginBottom: 15,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#111827",
    },

    subtitle: {
      color: "#6B7280",
      marginTop: 4,
    },

    search: {
      backgroundColor:
        "#fff",
      marginHorizontal: 20,
      borderRadius: 15,
      paddingHorizontal: 16,
      height: 55,
      elevation: 2,
      marginBottom: 15,
    },

    categoryContainer: {
      paddingLeft: 20,
      marginBottom: 15,
    },

    categoryChip: {
      backgroundColor:
        "#FFFFFF",
      paddingHorizontal: 20,
      height: 42,
      borderRadius: 22,
      justifyContent:
        "center",
      alignItems: "center",
      marginRight: 10,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
    },

    activeCategoryChip: {
      backgroundColor:
        "#FFD400",
      borderColor:
        "#FFD400",
    },

    categoryChipText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#374151",
    },

    activeCategoryChipText: {
      color: "#111827",
      fontWeight: "700",
    },

    workerCard: {
      backgroundColor:
        "#fff",
      marginHorizontal: 20,
      borderRadius: 20,
      padding: 16,
      marginBottom: 15,
      elevation: 3,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor:
        "#FFD400",
      justifyContent:
        "center",
      alignItems: "center",
    },

    avatarText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#111827",
    },

    workerInfo: {
      flex: 1,
      marginLeft: 12,
    },

    workerName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#111827",
    },

    profession: {
      color: "#6B7280",
      marginTop: 2,
    },

    rating: {
      color: "#F59E0B",
      marginTop: 4,
      fontWeight: "600",
    },

    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },

    statusText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },

    details: {
      marginTop: 15,
    },

    detailText: {
      color: "#4B5563",
      marginBottom: 6,
    },

    buttonRow: {
      flexDirection: "row",
      marginTop: 15,
    },

    callBtn: {
      flex: 1,
      backgroundColor:
        "#10B981",
      padding: 13,
      borderRadius: 12,
      alignItems: "center",
      marginRight: 8,
    },

    hireBtn: {
      flex: 1,
      backgroundColor:
        "#FFD400",
      padding: 13,
      borderRadius: 12,
      alignItems: "center",
    },

    btnText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 15,
    },

    hireText: {
      color: "#111827",
      fontWeight: "bold",
      fontSize: 15,
    },
  });