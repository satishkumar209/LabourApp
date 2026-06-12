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

export default function PhoneLoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");

  const sendOTP = async () => {
    if (mobile.length !== 10) {
      Alert.alert("Enter valid mobile number");
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
      Alert.alert("OTP Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        LabourLink
      </Text>

      <Text style={styles.heading}>
        What's your number?
      </Text>

      <View style={styles.phoneBox}>
        <Text style={styles.code}>
          +91
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="0000000000"
          value={mobile}
          onChangeText={setMobile}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={sendOTP}
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 50,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  phoneBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  code: {
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    flex: 1,
    fontSize: 20,
    padding: 15,
  },

  button: {
    backgroundColor: "#FFD400",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});