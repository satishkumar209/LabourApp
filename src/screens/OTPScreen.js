// src/screens/OTPScreen.js

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
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function OTPScreen({
  route,
  navigation,
}) {
  const { mobile } = route.params;

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Please enter a valid 6-digit OTP"
      );
      return;
    }

    try {
      setLoading(true);

      const res =
        await axios.post(
          "http://192.168.1.37:5000/api/auth/verify-otp",
          {
            mobile,
            otp,
          }
        );

      const user =
        res.data.user;

      if (
        res.data.isNewUser
      ) {
        navigation.replace(
          "CompleteProfile",
          {
            mobile:
              user.mobile,
          }
        );
      } else {
        navigation.replace(
          "Dashboard",
          {
            user,
          }
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "OTP Error",
        error?.response?.data
          ?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP =
    async () => {
      try {
        await axios.post(
          "http://192.168.1.37:5000/api/auth/send-otp",
          {
            mobile,
          }
        );

        Alert.alert(
          "Success",
          "OTP sent again successfully"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to resend OTP"
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

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {/* Top Section */}

        <View
          style={
            styles.topSection
          }
        >
          <View
            style={
              styles.iconCircle
            }
          >
            <Text
              style={
                styles.icon
              }
            >
              🔐
            </Text>
          </View>

          <Text
            style={
              styles.title
            }
          >
            Verify OTP
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Enter the 6-digit
            code sent to
          </Text>

          <Text
            style={
              styles.mobile
            }
          >
            +91 {mobile}
          </Text>
        </View>

        {/* Card */}

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.label
            }
          >
            OTP Code
          </Text>

          <TextInput
            style={
              styles.input
            }
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={
              setOtp
            }
          />

          {/* Verify Button */}

          <TouchableOpacity
            style={
              styles.button
            }
            onPress={
              verifyOTP
            }
            disabled={
              loading
            }
          >
            {loading ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text
                style={
                  styles.buttonText
                }
              >
                Verify OTP
              </Text>
            )}
          </TouchableOpacity>

          {/* Resend */}

          <TouchableOpacity
            onPress={
              resendOTP
            }
          >
            <Text
              style={
                styles.resend
              }
            >
              Didn't receive OTP?
              Resend
            </Text>
          </TouchableOpacity>

          {/* Change Number */}

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={
                styles.change
              }
            >
              Change Mobile
              Number
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Box */}

        <View
          style={
            styles.securityBox
          }
        >
          <Text
            style={
              styles.securityTitle
            }
          >
            🔒 Secure Login
          </Text>

          <Text
            style={
              styles.securityText
            }
          >
            Your OTP is encrypted
            and valid for a
            limited time only.
          </Text>
        </View>
      </ScrollView>
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

    topSection: {
      alignItems:
        "center",
      marginTop: 70,
      marginBottom: 30,
    },

    iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        "#FFD400",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 20,
      elevation: 5,
    },

    icon: {
      fontSize: 45,
    },

    title: {
      fontSize: 30,
      fontWeight:
        "bold",
      color: "#111827",
    },

    subtitle: {
      color: "#6B7280",
      marginTop: 8,
      fontSize: 15,
    },

    mobile: {
      fontSize: 18,
      fontWeight:
        "bold",
      marginTop: 10,
      color: "#111827",
    },

    card: {
      backgroundColor:
        "#fff",
      marginHorizontal: 20,
      borderRadius: 25,
      padding: 25,
      elevation: 4,
    },

    label: {
      fontSize: 15,
      fontWeight:
        "600",
      marginBottom: 10,
      color: "#374151",
    },

    input: {
      backgroundColor:
        "#F9FAFB",
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderRadius: 15,
      padding: 18,
      fontSize: 22,
      textAlign: "center",
      letterSpacing: 10,
      marginBottom: 20,
    },

    button: {
      backgroundColor:
        "#FFD400",
      height: 58,
      borderRadius: 15,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    buttonText: {
      fontSize: 17,
      fontWeight:
        "bold",
      color: "#111827",
    },

    resend: {
      textAlign:
        "center",
      color: "#2563EB",
      marginTop: 20,
      fontWeight:
        "600",
    },

    change: {
      textAlign:
        "center",
      color: "#6B7280",
      marginTop: 15,
    },

    securityBox: {
      backgroundColor:
        "#FFFFFF",
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      borderRadius: 20,
      marginBottom: 30,
    },

    securityTitle: {
      fontSize: 16,
      fontWeight:
        "bold",
      marginBottom: 8,
      color: "#111827",
    },

    securityText: {
      color: "#6B7280",
      lineHeight: 22,
    },
  });