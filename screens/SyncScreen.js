import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../config/firebase'; 

const FetchData = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // Retrieve the current user's data
      const currentUserDataRef = ref(db, `data/${user.uid}`);
      onValue(currentUserDataRef, (snapshot) => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          const filteredData = Object.keys(fetchedData)
            .filter((key) => fetchedData[key].title === searchTitle)
            .map((key) => ({
              id: key,
              ...fetchedData[key],
            }));
          setData(filteredData);
        } else {
          setData([]);
        }
      });

      // Retrieve data from connected users
      const connectionsRef = ref(db, `users/${user.uid}/connections`);
      onValue(connectionsRef, (snapshot) => {
        if (snapshot.exists()) {
          const connections = snapshot.val();
          const connectedUsersDataPromises = Object.keys(connections).map((connectedUserID) => {
            const connectedUserDataRef = ref(db, `data/${connectedUserID}`);
            return onValue(connectedUserDataRef, (snapshot) => {
              const connectedUserData = snapshot.val();
              if (connectedUserData) {
                return { id: connectedUserID, ...connectedUserData };
              }
              return null;
            });
          });

          Promise.all(connectedUsersDataPromises).then((connectedUsersData) => {
            const filteredConnectedUsersData = connectedUsersData.filter((data) => data !== null);
            setData((prevData) => [...prevData, ...filteredConnectedUsersData]);
          });
        }
      });
    }
  }, [searchTitle]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Data</Text>
      <TextInput
        placeholder="Enter Title"
        value={searchTitle}
        onChangeText={(text) => setSearchTitle(text)}
        style={styles.input}
      />
      <ScrollView style={styles.dataContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.dataItem}>
            <Text style={styles.dataTitle}>{item.title}</Text>
            <Text style={styles.dataBody}>{item.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FetchData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2196F3',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 12,
    fontSize: 20,
    borderRadius: 8,
    width: '80%',
    textAlign: 'right',
  },
  dataContainer: {
    width: '80%',
    marginTop: 20,
    maxHeight: 300,
  },
  dataItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataBody: {
    fontSize: 16,
    color: '#666',
  },
});
