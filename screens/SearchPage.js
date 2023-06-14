import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { get } from 'firebase/database';
import { db, auth } from '../config/firebase';
import { sRef, onValue } from '../utils/hooks/firebaseDatabase';

const SearchPage = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [data, setData] = useState([]);

  const fetchConnectedUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const connectionsRef = sRef(db, `connections`);
      const connectionsSnapshot = await get(connectionsRef);

      if (!connectionsSnapshot.exists()) {
        // No connections found
        setData([]);
        return;
      }

      const connections = connectionsSnapshot.val();
      const connectedUsersDataPromises = Object.values(connections)
        .filter(
          (connection) =>
            connection.status === 'accepted' &&
            (connection.senderUserId === user.uid || connection.receiverUserId === user.uid)
        )
        .map((connection) => {
          const connectedUserId =
            connection.senderUserId === user.uid ? connection.receiverUserId : connection.senderUserId;
          const connectedUserDataRef = ref(db, `data/${connectedUserId}`);
          return get(connectedUserDataRef).then((snapshot) => {
            return snapshot.exists() ? { id: connectedUserId, ...snapshot.val() } : null;
          });
        });

      const connectedUsersData = await Promise.all(connectedUsersDataPromises);
      const filteredConnectedUsersData = connectedUsersData.filter((data) => data !== null);
      setData(filteredConnectedUsersData);
    } catch (error) {
      console.error('Error fetching connected users data:', error);
    }
  };

  const handleSearch = () => {
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

      // Fetch connected users' data
      fetchConnectedUserData();
    }
  };

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
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    backgroundColor: '#009688',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataContainer: {
    width: '80%',
    maxHeight: 400,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dataItem: {
    marginBottom: 10,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataBody: {
    fontSize: 16,
  },
});

export default SearchPage;
