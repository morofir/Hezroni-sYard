import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../config/firebase';
import { MaterialIcons } from '@expo/vector-icons';

const AddData = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const checkmarkAnimation = useRef(new Animated.Value(0)).current;

  const dataAddOn = () => {
    set(ref(db, 'posts/' + title), {
      title: title,
      body: body,
    })
      .then(() => {
        console.log('Data added successfully');
        setTitle('');
        setBody('');

        // Start the checkmark animation
        startCheckmarkAnimation();
      })
      .catch((error) => {
        console.log('Error adding data:', error);
      });
  };

  const startCheckmarkAnimation = () => {
    Animated.sequence([
      Animated.timing(checkmarkAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(checkmarkAnimation, {
        toValue: 0,
        duration: 0,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkmarkStyle = {
    opacity: checkmarkAnimation,
    transform: [
      {
        scale: checkmarkAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>עד כמה ההיכרות חזקה </Text>
      <TextInput
        placeholder="שם מלא"
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
      <TouchableOpacity style={styles.button} onPress={dataAddOn}>
        <Text style={styles.buttonText}>Add Data</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.checkmark, checkmarkStyle]}>
        <MaterialIcons name="check" size={32} color="#fff" />
      </Animated.View>
    </View>
  );
};

export default AddData;

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
    backgroundColor: '#fff',
    elevation: 2,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  checkmark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
