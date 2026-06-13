// src/screens/LoginScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function LoginScreen({
  navigation,
}) {
  const [mobile, setMobile] =
    useState("");

  const sendOTP = async () => {
    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      await axios.post(
        "http://192.168.1.37:5000/api/auth/send-otp",
        {
          mobile,
        }
      );

      navigation.navigate("OTP", {
        mobile,
      });
    } catch (error) {
      console.log(error);

      Alert.alert(
        "OTP Error",
        "Failed to send OTP."
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* Hero Section */}

          <View style={styles.hero}>
            <View
              style={styles.logoCircle}
            >
              <Text
                style={
                  styles.logoIcon
                }
              >
                👷
              </Text>
            </View>

            <Text
              style={styles.logo}
            >
              LabourLink
            </Text>

            <Text
              style={
                styles.tagline
              }
            >
              Connect with skilled
              workers instantly
            </Text>
          </View>

          {/* Card */}

          <View style={styles.card}>
            <Text
              style={
                styles.heading
              }
            >
              Welcome Back 👋
            </Text>

            <Text
              style={
                styles.subHeading
              }
            >
              Login using your
              mobile number
            </Text>

            {/* Phone Input */}

            <Text
              style={
                styles.inputLabel
              }
            >
              Mobile Number
            </Text>

            <View
              style={
                styles.phoneBox
              }
            >
              <View
                style={
                  styles.countryBox
                }
              >
                <Text
                  style={
                    styles.countryCode
                  }
                >
                  🇮🇳 +91
                </Text>
              </View>

              <TextInput
                style={
                  styles.input
                }
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter mobile number"
                value={mobile}
                onChangeText={
                  setMobile
                }
              />
            </View>

            {/* OTP Button */}

            <TouchableOpacity
              style={
                styles.button
              }
              activeOpacity={
                0.9
              }
              onPress={
                sendOTP
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Continue with OTP
              </Text>
            </TouchableOpacity>

            {/* Benefits */}

            <View
              style={
                styles.benefitsBox
              }
            >
              <Text
                style={
                  styles.benefit
                }
              >
                ✅ Quick OTP Login
              </Text>

              <Text
                style={
                  styles.benefit
                }
              >
                ✅ Verified Workers
              </Text>

              <Text
                style={
                  styles.benefit
                }
              >
                ✅ Real-Time Job Tracking
              </Text>

              <Text
                style={
                  styles.benefit
                }
              >
                ✅ Secure Payments
              </Text>
            </View>

            {/* Footer */}

            <Text
              style={
                styles.footer
              }
            >
              By continuing, you
              agree to LabourLink's
              Terms & Privacy
              Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F7F8FA",
    },

    hero: {
      alignItems: "center",
      paddingTop: 70,
      paddingBottom: 40,
    },

    logoCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor:
        "#FFD400",
      justifyContent:
        "center",
      alignItems: "center",
      elevation: 5,
    },

    logoIcon: {
      fontSize: 42,
    },

    logo: {
      fontSize: 34,
      fontWeight: "bold",
      color: "#111827",
      marginTop: 15,
    },

    tagline: {
      color: "#6B7280",
      marginTop: 8,
      fontSize: 15,
    },

    card: {
      flex: 1,
      backgroundColor:
        "#FFFFFF",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      padding: 25,
      elevation: 5,
    },

    heading: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#111827",
    },

    subHeading: {
      color: "#6B7280",
      marginTop: 6,
      marginBottom: 25,
    },

    inputLabel: {
      fontSize: 15,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 10,
    },

    phoneBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "#F9FAFB",
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      marginBottom: 25,
    },

    countryBox: {
      paddingHorizontal: 15,
      paddingVertical: 18,
      borderRightWidth: 1,
      borderColor: "#E5E7EB",
    },

    countryCode: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#111827",
    },

    input: {
      flex: 1,
      paddingHorizontal: 15,
      fontSize: 18,
      color: "#111827",
    },

    button: {
      backgroundColor:
        "#FFD400",
      height: 58,
      borderRadius: 15,
      justifyContent:
        "center",
      alignItems: "center",
      marginBottom: 25,
      elevation: 3,
    },

    buttonText: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#111827",
    },

    benefitsBox: {
      backgroundColor:
        "#F9FAFB",
      borderRadius: 15,
      padding: 18,
      marginBottom: 25,
    },

    benefit: {
      fontSize: 15,
      color: "#374151",
      marginBottom: 10,
    },

    footer: {
      textAlign: "center",
      color: "#9CA3AF",
      fontSize: 13,
      lineHeight: 20,
    },
  });