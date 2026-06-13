import React, { useEffect, useState } from "react";
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
import * as Location from "expo-location";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

export default function JobsScreen({ route,navigation, }) {
const user = route?.params?.user|| null;;
if (!route?.params?.user) {
  return (
    <View style={styles.center}>
      <Text>User not found</Text>
    </View>
  );
}
const [category, setCategory] = useState("");
const [jobTitle, setJobTitle] = useState("");
const [description, setDescription] = useState("");
const [workersRequired, setWorkersRequired] = useState("");
const [budget, setBudget] = useState("500");
const [workType, setWorkType] = useState("");

const [jobDate, setJobDate] = useState("");
const [jobTime, setJobTime] = useState("");

const [showDate, setShowDate] = useState(false);
const [showTime, setShowTime] = useState(false);

const [address, setAddress] = useState("");
const [instructions, setInstructions] = useState("");
const [gpsLocation, setGpsLocation] = useState("");

const [jobs, setJobs] = useState([]);

const API = "http://192.168.1.37:5000";

const getCurrentLocation = async () => {
try {
const { status } =
await Location.requestForegroundPermissionsAsync();


  if (status !== "granted") {
    Alert.alert("Location permission denied");
    return;
  }

  const location =
    await Location.getCurrentPositionAsync({});

  setGpsLocation(
    `${location.coords.latitude}, ${location.coords.longitude}`
  );
} catch (error) {
  console.log(error);
}


};

const loadJobs = async () => {
try {
const res = await axios.get(
`${API}/api/jobs/user/${user._id}`
);


  setJobs(res.data);
} catch (err) {
  console.log(err);
}


};

useEffect(() => {
if (user) {
loadJobs();
getCurrentLocation();
}
}, [user]);

const postJob = async () => {
if (
!category ||
!jobTitle ||
!workersRequired ||
!budget ||
!workType ||
!jobDate ||
!jobTime ||
!address ||
!description
) {
Alert.alert(
"Please fill all required fields"
);
return;
}


try {
  await axios.post(
    `${API}/api/jobs/create`,
    {
      userId: user._id,
      customerName: user.name,
      mobile: user.mobile,

      category,
      jobTitle,
      description,

      workersRequired,
      budget,
      workType,

      jobDate,
      jobTime,

      address,
      gpsLocation,

      instructions,

      status: "Pending",
    }
  );

  Alert.alert(
    "Success",
    "Job Posted Successfully"
  );

  setCategory("");
  setJobTitle("");
  setDescription("");
  setWorkersRequired("");
  setBudget("500");
  setWorkType("");
  setJobDate("");
  setJobTime("");
  setAddress("");
  setInstructions("");

  loadJobs();
} catch (err) {
  console.log(err);
  Alert.alert(
    "Error",
    "Failed to post job"
  );
}


};

if (!user) {
return ( <View style={styles.center}> <Text>User not found</Text> </View>
);
}

return (
<FlatList
data={jobs}
keyExtractor={(item) => item._id}
ListHeaderComponent={
<> <Text style={styles.title}>
Post New Job </Text>

```
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Workers Required"
        keyboardType="numeric"
        value={workersRequired}
        onChangeText={setWorkersRequired}
      />

      <Text style={styles.label}>
        Budget ₹{budget}
      </Text>

      <Slider
        minimumValue={500}
        maximumValue={50000}
        step={500}
        value={Number(budget)}
        onValueChange={(value) =>
          setBudget(String(value))
        }
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={workType}
          onValueChange={(value) =>
            setWorkType(value)
          }
        >
          <Picker.Item
            label="Select Work Type"
            value=""
          />

          <Picker.Item
            label="Daily"
            value="Daily"
          />

          <Picker.Item
            label="Fixed"
            value="Fixed"
          />

          <Picker.Item
            label="Contract"
            value="Contract"
          />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          setShowDate(true)
        }
      >
        <Text>
          {jobDate ||
            "Select Job Date"}
        </Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={(e, date) => {
            setShowDate(false);

            if (date) {
              setJobDate(
                date.toLocaleDateString()
              );
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          setShowTime(true)
        }
      >
        <Text>
          {jobTime ||
            "Select Job Time"}
        </Text>
      </TouchableOpacity>

      {showTime && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          onChange={(e, time) => {
            setShowTime(false);

            if (time) {
              setJobTime(
                time.toLocaleTimeString()
              );
            }
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Full Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        editable={false}
        value={gpsLocation}
        placeholder="GPS Location"
      />

      <TextInput
        style={styles.input}
        placeholder="Special Instructions"
        value={instructions}
        onChangeText={
          setInstructions
        }
      />

      <TextInput
        style={styles.description}
        multiline
        placeholder="Detailed Job Description"
        value={description}
        onChangeText={
          setDescription
        }
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
        My Job History
      </Text>
    </>
  }
  renderItem={({ item }) => (
    <TouchableOpacity
  style={styles.jobCard}
  onPress={() =>
    navigation.navigate(
      "JobDetails",
      {
        jobId: item._id,
        user,
      }
    )
  }
>
  
      <Text style={styles.jobTitle}>
        {item.jobTitle}
      </Text>

      <Text>
        Category: {item.category}
      </Text>

      <Text>
        Budget: ₹{item.budget}
      </Text>

      <Text>
        Workers: {item.workersRequired}
      </Text>

      <Text>
        Type: {item.workType}
      </Text>

      <Text>
        Date: {item.jobDate}
      </Text>

      <Text>
        Time: {item.jobTime}
      </Text>

      <Text>
        📍 {item.address}
      </Text>

      <Text>
        Status: {item.status}
      </Text>
    
</TouchableOpacity>
  )}
/>


);
}

const styles = StyleSheet.create({
center: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},

title: {
fontSize: 30,
fontWeight: "bold",
margin: 20,
},

input: {
backgroundColor: "#fff",
marginHorizontal: 20,
marginBottom: 10,
padding: 15,
borderRadius: 12,
},

label: {
marginHorizontal: 20,
fontWeight: "bold",
marginBottom: 10,
},

pickerContainer: {
backgroundColor: "#fff",
marginHorizontal: 20,
marginBottom: 10,
borderRadius: 12,
},

description: {
backgroundColor: "#fff",
marginHorizontal: 20,
marginBottom: 15,
borderRadius: 12,
padding: 15,
height: 120,
textAlignVertical: "top",
},

button: {
backgroundColor: "#FFD400",
marginHorizontal: 20,
marginBottom: 20,
padding: 16,
borderRadius: 12,
alignItems: "center",
},

btnText: {
fontWeight: "bold",
fontSize: 16,
},

history: {
fontSize: 22,
fontWeight: "bold",
marginHorizontal: 20,
marginBottom: 10,
},

jobCard: {
backgroundColor: "#fff",
marginHorizontal: 20,
marginBottom: 12,
padding: 15,
borderRadius: 12,
},

jobTitle: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 5,
},
});
