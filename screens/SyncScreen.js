import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground } from "react-native";
import { db } from "../config/firebase";
import { ref, onValue, off } from "firebase/database";

const FetchData = () => {
  const [todoData, setTodoData] = useState([]);
  const [searchTitle, setSearchTitle] = useState(null);
  const starCountRef = ref(db, "posts/");

  useEffect(() => {
    fetchData();

    // Detach the listener when the component unmounts
    return () => {
      off(starCountRef);
    };
  }, []);

  const fetchData = () => {
    if (searchTitle && searchTitle.trim() !== "") {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const filteredData = filterDataByTitle(snapshot, data); // Pass snapshot as a parameter
        setTodoData(filteredData);
      });
    } else {
      // If searchTitle is empty, set the todoData to an empty array
      setTodoData([]);
    }
  }

  const filterDataByTitle = (snapshot, data) => {
    const filteredData = [];
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const childData = childSnapshot.val();
      if (childData.title === searchTitle) {
        const bodies = [];
        for (let i = 0; i < 10; i++) {
          const bodyKey = `body${i}`;
          if (childData[bodyKey]) {
            bodies.push(childData[bodyKey]);
          }
        }
        filteredData.push({
          id: key,
          ...childData,
          bodies: bodies,
        });
      }
    });
    return filteredData;
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <ImageBackground source={require('../assets/rekaus_love.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {searchTitle != '' && <SyncScreen partner={searchTitle} currentUser='אבי ארגס' />}
          <Text style={styles.header}>קבלת מידע מהפרטנר</Text>
          <Text style={styles.subtitle}>לקבלת התשובות של האחר חפשו לפי התבנית הבאה: (שם בן/בת הזוג) על (שמכם)</Text>
          <Text style={styles.subtitle}>לקבלת המשוב חפשו לפי התבנית הבאה: (שמכם) + (משוב)</Text>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search by title"
              value={searchTitle}
              onChangeText={(text) => setSearchTitle(text)}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
          {todoData.map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.title}> {item.title}</Text>
                {item.bodies.map((body, bodyIndex) => (
                  <View key={bodyIndex} style={styles.bodyItem}>
                    <Text style={styles.bodyText}> {body}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );

};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginEnd: 10,
    padding: 10,
    fontSize: 20,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardContainer: {
    width: "80%",
    marginVertical: 10,
    alignSelf: "center",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  bodyItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  bodyText: {
    fontSize: 18,
    textAlign: "center",
  },
});

const SyncScreen = ({ partner, currentUser }) => {
  //const [partner, setPartner] = useState('my friend');
  const [partnerStatus, setPartnerStatus] = useState('confirmed');

  const STATUS = {
    UNKNOWN: 'unknown',
    UNPAIRED: 'unpaired',
    PAIRED: 'paired',
    PENDING: 'pending',
    REQUEST: 'request',
    REQUESTED: 'requested',
    RESET: 'reset',
    CONFIRM: 'confirm'
  }
  const getPartner = async (currentUser, partner) => {
    //TODO
    return [mystatus, partner, theirstatus]
  }
  const setPartner = async (user, partner, status) => {
    return true;
  }

  const updatePartners = async (currentUser, partnerParam, status) => {
    let [mystatus, partner, theirstatus] = getPartner(currentUser, partnerParam);

    try {
      if (mystatus === STATUS.PAIRED)
        return "כבר בזוגיות" + partner; // goto

      if (mystatus === STATUS.REQUESTED)
        return "you need to confirm for " + partner; // display confirm button

      if (mystatus === STATUS.PENDING)
        return "תבקש מהחבר לאשר";

      if (theirstatus === STATUS.UNKNOWN)
        return "אין משתתף כזה";

      if (theirstatus === STATUS.UNPAIRED && status === STATUS.REQUEST) {
        setPartner(partner, currentUser, STATUS.REQUESTED);
        setPartner(currentUser, partner, STATUS.PENDING);
      }
      if (status === STATUS.CONFIRM) {
        setPartner(partner, currentUser, STATUS.PAIRED);
        setPartner(currentUser, partner, STATUS.PAIRED);
      }
      if (status === STATUS.RESET) {
        setPartner(partner, "", STATUS.UNPAIRED);
        setPartner(currentUser, "", STATUS.UNPAIRED);
      }
    } catch (error) {
      // Handle the error
    }
  }


  return (
    <View>
      <Text>{partner}</Text>
    </View>
  );
}



export default FetchData; 
