import React, { useState, useEffect } from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
StyleSheet,
Alert,
Linking,
ActivityIndicator,
} from "react-native";

import axios from "axios";

export default function JobDetailsScreen({
route,
navigation,
}) {
const jobId = route?.params?.jobId;

const API =
"http://192.168.1.37:5000";

const [job, setJob] =
useState(null);

const [loading, setLoading] =
useState(true);

const [editing, setEditing] =
useState(false);

const loadJob = async () => {
try {
const res =
await axios.get(
`${API}/api/jobs/${jobId}`
);


  setJob(res.data);
} catch (err) {
  console.log(err);

  Alert.alert(
    "Error",
    "Unable to load job"
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
loadJob();
}, []);

const updateJob = async () => {
try {
await axios.put(
`${API}/api/jobs/update/${job._id}`,
job
);


  Alert.alert(
    "Success",
    "Job Updated Successfully"
  );

  setEditing(false);

  loadJob();
} catch (err) {
  console.log(err);

  Alert.alert(
    "Error",
    "Update Failed"
  );
}


};

const cancelJob = async () => {
Alert.alert(
"Cancel Job",
"Are you sure you want to cancel this job?",
[
{
text: "No",
},
{
text: "Yes",
onPress: async () => {
try {
await axios.put(
`${API}/api/jobs/update/${job._id}`,
{
...job,
status:
"Cancelled",
}
);


          Alert.alert(
            "Success",
            "Job Cancelled"
          );

          loadJob();
        } catch (err) {
          console.log(err);
        }
      },
    },
  ]
);


};

const callWorker = () => {
if (!job?.workerMobile) {
Alert.alert(
"Worker not assigned yet"
);
return;
}


Linking.openURL(
  `tel:${job.workerMobile}`
);


};

const openMap = () => {
if (!job?.gpsLocation) {
Alert.alert(
"Location unavailable"
);
return;
}


const coords =
  job.gpsLocation.split(",");

Linking.openURL(
  `https://maps.google.com/?q=${coords[0]},${coords[1]}`
);


};

const getStatusColor = () => {
switch (job?.status) {
case "Pending":
return "#F59E0B";


  case "Accepted":
    return "#3B82F6";

  case "In Progress":
    return "#8B5CF6";

  case "Completed":
    return "#10B981";

  case "Cancelled":
    return "#EF4444";

  default:
    return "#6B7280";
}


};

if (loading) {
return ( <View style={styles.center}> <ActivityIndicator
       size="large"
       color="#FFD400"
     />


    <Text
      style={{
        marginTop: 15,
      }}
    >
      Loading Job Details...
    </Text>
  </View>
);


}

if (!job) {
return ( <View style={styles.center}> <Text>
Job Not Found </Text> </View>
);
}

return (
<ScrollView
style={styles.container}
showsVerticalScrollIndicator={
false
}
>
{/* HERO */}


  <View
    style={styles.heroCard}
  >
    <View
      style={
        styles.heroHeader
      }
    >
      <View>
        <Text
          style={
            styles.jobTitle
          }
        >
          {job.jobTitle}
        </Text>

        <Text
          style={
            styles.jobCategory
          }
        >
          {job.category}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              getStatusColor(),
          },
        ]}
      >
        <Text
          style={
            styles.badgeText
          }
        >
          {job.status}
        </Text>
      </View>
    </View>

    <Text
      style={
        styles.budgetText
      }
    >
      ₹{job.budget}
    </Text>
  </View>

  {/* DESCRIPTION */}

  <View style={styles.card}>
    <Text
      style={
        styles.sectionTitle
      }
    >
      Job Description
    </Text>

    <Text
      style={
        styles.value
      }
    >
      {job.description}
    </Text>
  </View>

  {/* INFO */}

  <View style={styles.card}>
    <Text
      style={
        styles.sectionTitle
      }
    >
      Job Information
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      👷 Workers:
      {" "}
      {
        job.workersRequired
      }
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      💼 Type:
      {" "}
      {job.workType}
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      📅 Date:
      {" "}
      {job.jobDate}
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      ⏰ Time:
      {" "}
      {job.jobTime}
    </Text>
  </View>

  {/* ADDRESS */}

  <View style={styles.card}>
    <Text
      style={
        styles.sectionTitle
      }
    >
      Location
    </Text>

    <Text
      style={
        styles.value
      }
    >
      📍 {job.address}
    </Text>
  </View>

  {/* WORKER */}

  <View style={styles.card}>
    <Text
      style={
        styles.sectionTitle
      }
    >
      Assigned Worker
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      👷
      {" "}
      {job.workerName ||
        "Not Assigned"}
    </Text>

    <Text
      style={
        styles.infoText
      }
    >
      📞
      {" "}
      {job.workerMobile ||
        "-"}
    </Text>

    <TouchableOpacity
      style={styles.callBtn}
      onPress={
        callWorker
      }
    >
      <Text
        style={
          styles.btnText
        }
      >
        Call Worker
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.chatBtn}
    >
      <Text
        style={
          styles.btnText
        }
      >
        Chat
      </Text>
    </TouchableOpacity>
  </View>

  {/* ACTIONS */}

  <TouchableOpacity
    style={styles.mapBtn}
    onPress={openMap}
  >
    <Text
      style={
        styles.btnText
      }
    >
      Open Location
    </Text>
  </TouchableOpacity>

  {editing ? (
    <TouchableOpacity
      style={
        styles.saveBtn
      }
      onPress={
        updateJob
      }
    >
      <Text
        style={
          styles.btnText
        }
      >
        Save Changes
      </Text>
    </TouchableOpacity>
  ) : (
    job.status ===
      "Pending" && (
      <TouchableOpacity
        style={
          styles.editBtn
        }
        onPress={() =>
          setEditing(
            true
          )
        }
      >
        <Text
          style={
            styles.editText
          }
        >
          Edit Job
        </Text>
      </TouchableOpacity>
    )
  )}

  {job.status ===
    "Pending" && (
    <TouchableOpacity
      style={
        styles.cancelBtn
      }
      onPress={
        cancelJob
      }
    >
      <Text
        style={
          styles.btnText
        }
      >
        Cancel Job
      </Text>
    </TouchableOpacity>
  )}

  <View
    style={{
      height: 50,
    }}
  />
</ScrollView>


);
}

const styles =
StyleSheet.create({
container: {
flex: 1,
backgroundColor:
"#F7F8FA",
padding: 20,
},


center: {
  flex: 1,
  justifyContent:
    "center",
  alignItems:
    "center",
},

heroCard: {
  backgroundColor:
    "#111827",
  borderRadius: 20,
  padding: 20,
  marginBottom: 15,
},

heroHeader: {
  flexDirection:
    "row",
  justifyContent:
    "space-between",
  alignItems:
    "center",
},

jobTitle: {
  color: "#fff",
  fontSize: 24,
  fontWeight:
    "bold",
},

jobCategory: {
  color: "#D1D5DB",
  marginTop: 5,
},

budgetText: {
  color: "#FFD400",
  fontSize: 32,
  fontWeight:
    "bold",
  marginTop: 15,
},

statusBadge: {
  paddingHorizontal:
    12,
  paddingVertical: 6,
  borderRadius: 20,
},

badgeText: {
  color: "#fff",
  fontWeight:
    "bold",
},

card: {
  backgroundColor:
    "#fff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  elevation: 3,
},

sectionTitle: {
  fontSize: 18,
  fontWeight:
    "bold",
  marginBottom: 10,
},

value: {
  fontSize: 15,
  color: "#111827",
},

infoText: {
  fontSize: 15,
  marginBottom: 8,
},

callBtn: {
  backgroundColor:
    "#10B981",
  padding: 14,
  borderRadius: 10,
  marginTop: 10,
  alignItems:
    "center",
},

chatBtn: {
  backgroundColor:
    "#3B82F6",
  padding: 14,
  borderRadius: 10,
  marginTop: 10,
  alignItems:
    "center",
},

mapBtn: {
  backgroundColor:
    "#8B5CF6",
  padding: 15,
  borderRadius: 12,
  marginBottom: 10,
  alignItems:
    "center",
},

editBtn: {
  backgroundColor:
    "#FFD400",
  padding: 15,
  borderRadius: 12,
  alignItems:
    "center",
  marginBottom: 10,
},

saveBtn: {
  backgroundColor:
    "#10B981",
  padding: 15,
  borderRadius: 12,
  alignItems:
    "center",
  marginBottom: 10,
},

cancelBtn: {
  backgroundColor:
    "#EF4444",
  padding: 15,
  borderRadius: 12,
  alignItems:
    "center",
  marginBottom: 10,
},

btnText: {
  color: "#fff",
  fontWeight:
    "bold",
},

editText: {
  color: "#111827",
  fontWeight:
    "bold",
},


});
