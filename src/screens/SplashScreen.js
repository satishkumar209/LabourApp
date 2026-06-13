// src/screens/SplashScreen.js

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";

export default function SplashScreen({
  navigation,
}) {
  const scaleAnim = useRef(
    new Animated.Value(0.8)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#111827"
        barStyle="light-content"
      />

      {/* Logo Circle */}

      <Animated.View
        style={[
          styles.logoCircle,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}
      >
        <Text style={styles.logoIcon}>
          👷
        </Text>
      </Animated.View>

      {/* App Name */}

      <Animated.Text
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        LabourLink
      </Animated.Text>

      {/* Tagline */}

      <Text style={styles.tagline}>
        Connecting Skilled Workers
        & Customers
      </Text>

      {/* Features */}

      <View style={styles.features}>
        <Text
          style={styles.featureText}
        >
          ⚡ Instant Hiring
        </Text>

        <Text
          style={styles.featureText}
        >
          📍 Live Tracking
        </Text>

        <Text
          style={styles.featureText}
        >
          ⭐ Verified Workers
        </Text>
      </View>

      {/* Loading */}

      <View style={styles.loadingRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Footer */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made in India 🇮🇳
        </Text>

        <Text style={styles.version}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#111827",
      justifyContent:
        "center",
      alignItems:
        "center",
      paddingHorizontal: 25,
    },

    logoCircle: {
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor:
        "#FFD400",
      justifyContent:
        "center",
      alignItems:
        "center",
      elevation: 10,
      marginBottom: 25,
    },

    logoIcon: {
      fontSize: 60,
    },

    logo: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#FFFFFF",
    },

    tagline: {
      color: "#D1D5DB",
      fontSize: 16,
      marginTop: 10,
      textAlign: "center",
    },

    features: {
      marginTop: 40,
      alignItems: "center",
    },

    featureText: {
      color: "#E5E7EB",
      fontSize: 15,
      marginBottom: 8,
    },

    loadingRow: {
      flexDirection: "row",
      marginTop: 50,
    },

    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor:
        "#FFD400",
      marginHorizontal: 6,
    },

    footer: {
      position: "absolute",
      bottom: 40,
      alignItems: "center",
    },

    footerText: {
      color: "#9CA3AF",
      fontSize: 14,
    },

    version: {
      color: "#6B7280",
      fontSize: 12,
      marginTop: 5,
    },
  });