import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { push, ref, set, child } from 'firebase/database';
import { db, auth } from '../config/firebase';

const AddData = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const user = auth.currentUser; // Get the current user from Firebase auth

  const handleSubmit = () => {
    if (user) {
      const dataRef = ref(db, `data/${user.uid}`);
      const newDataRef = push(dataRef);
      const entryID = newDataRef.key;
      
      const newData = {
        entryID,
        title,
        body,
      };

      set(child(dataRef, entryID), newData)
        .then(() => {
          console.log('Data added successfully!');
          // Reset the input fields
          setTitle('');
          setBody('');
        })
        .catch((error) => {
          console.error('Error adding data:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Data</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
