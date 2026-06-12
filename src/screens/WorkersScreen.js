// src/screens/WorkersScreen.js

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

const workers = [
  {
    id: "1",
    name: "Raj Kumar",
    profession: "Electrician",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Amit Sharma",
    profession: "Plumber",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Sunil Kumar",
    profession: "Painter",
    rating: 4.6,
  },
];

export default function WorkersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Available Workers
      </Text>

      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              Profession: {item.profession}
            </Text>

            <Text>
              ⭐ {item.rating}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});