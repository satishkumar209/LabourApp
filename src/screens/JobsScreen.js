import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import axios from "axios";

export default function JobsScreen({
  route,
}) {

  const { user } = route.params;

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobs, setJobs] =
    useState([]);


  const loadJobs = async () => {

    try {

      const res = await axios.get(
        `http://192.168.1.37:5000/api/jobs/user/${user._id}`
      );

      setJobs(res.data);

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {

    loadJobs();

  }, []);


  const postJob = async () => {

    if (
      !category ||
      !description ||
      !location
    ) {

      Alert.alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      await axios.post(
        "http://192.168.1.37:5000/api/jobs/create",
        {
          userId: user._id,
          customerName: user.name,
          mobile: user.mobile,
          category,
          description,
          location,
        }
      );

      Alert.alert(
        "Success",
        "Job Posted"
      );

      setCategory("");
      setDescription("");
      setLocation("");

      loadJobs();

    } catch (err) {

      console.log(err);

      Alert.alert(
        "Error",
        "Failed to post job"
      );
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.title}>
            Post New Job
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={postJob}
          >
            <Text style={styles.btnText}>
              Post Job
            </Text>
          </TouchableOpacity>

          <Text style={styles.history}>
            Job History
          </Text>
        </>
      }

      data={jobs}

      keyExtractor={(item) =>
        item._id
      }

      renderItem={({ item }) => (
        <View style={styles.jobCard}>

          <Text style={styles.jobTitle}>
            {item.category}
          </Text>

          <Text>
            {item.description}
          </Text>

          <Text>
            📍 {item.location}
          </Text>

          <Text>
            Status:
            {" "}
            {item.status}
          </Text>

        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({

  title:{
    fontSize:28,
    fontWeight:"bold",
    margin:20,
  },

  input:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginBottom:10,
    padding:15,
    borderRadius:12,
  },

  button:{
    backgroundColor:"#FFD400",
    margin:20,
    padding:15,
    borderRadius:12,
    alignItems:"center",
  },

  btnText:{
    fontWeight:"bold",
  },

  history:{
    fontSize:22,
    fontWeight:"bold",
    marginHorizontal:20,
    marginBottom:10,
  },

  jobCard:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginBottom:12,
    padding:15,
    borderRadius:12,
  },

  jobTitle:{
    fontWeight:"bold",
    fontSize:18,
    marginBottom:5,
  },

});