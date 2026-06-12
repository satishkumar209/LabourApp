import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function OTPScreen({ route, navigation }) {
  const { mobile } = route.params;

  const [otp, setOtp] = useState("");

  const verifyOTP = async () => {
    try {
      const res = await axios.post(
         "http://192.168.1.37:5000/api/auth/verify-otp",
        
        {
          mobile,
          otp,
        }
      );

      const user = res.data.user;

      if (res.data.isNewUser) {
        navigation.replace("CompleteProfile", {
          mobile: user.mobile,
        });
      } else {
        navigation.replace("Dashboard", {
          user,
        });
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "OTP Error",
        error?.res?.data?.message ||
          "Invalid OTP"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Verify OTP
      </Text>

      <Text style={styles.mobile}>
        Sent to {mobile}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={verifyOTP}
      >
        <Text style={styles.buttonText}>
          Verify OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  mobile: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FACC15",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});