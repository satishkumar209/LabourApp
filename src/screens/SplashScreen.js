import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000); // 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LabourLink</Text>
      <Text>Connecting Workers & Customers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c9ae28",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
});