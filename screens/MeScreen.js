<<<<<<< Updated upstream
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../config/firebase';
import { MaterialIcons } from '@expo/vector-icons';
=======
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { push, set, child } from 'firebase/database';
import { db, auth } from '../config/firebase';
import { sRef, onValue } from '../utils/hooks/firebaseDatabase';
>>>>>>> Stashed changes

const AddData = () => {
  const [title, setTitle] = useState('');
  const [body0, setBody0] = useState('');
  const [body1, setBody1] = useState('');
  const [body2, setBody2] = useState('');
  const [body3, setBody3] = useState('');
  const [body4, setBody4] = useState('');
  const [body5, setBody5] = useState('');
  const [body6, setBody6] = useState('');
  const [body7, setBody7] = useState('');
  const [body8, setBody8] = useState('');
  const [body9, setBody9] = useState('');
  const checkmarkAnimation = useRef(new Animated.Value(0)).current;

  const dataAddOn = () => {
    set(ref(db, 'posts/' + title), {
      title: title,
      body0: body0,
      body1: body1,
      body2: body2,
      body3: body3,
      body4: body4,
      body5: body5,
      body6: body6,
      body7: body7,
      body8: body8,
      body9: body9,
    })
      .then(() => {
        console.log('Data added successfully');
        setTitle('');
        setBody0('');
        setBody1('');
        setBody2('');
        setBody3('');
        setBody4('');
        setBody5('');
        setBody6('');
        setBody7('');
        setBody8('');
        setBody9('');

<<<<<<< Updated upstream
        // Start the checkmark animation
        startCheckmarkAnimation();
      })
      .catch((error) => {
        console.log('Error adding data:', error);
      });
  };
=======
  const handleSubmit = () => {
    if (user) {
      const dataRef = sRef(db, `data/${user.uid}`);
      const newDataRef = push(dataRef);
      const entryID = newDataRef.key;

      const newData = {
        entryID,
        title,
        body,
      };
>>>>>>> Stashed changes

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
    <ImageBackground source={require('../assets/rekaus_love.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>שאלון אישי</Text>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            placeholder="שם מלא"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מהי הדרך האידיאלית שלך לבלות חופשה"
            value={body0}
            onChangeText={(text) => setBody0(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מה גורם לך לא לאהוב אדם"
            value={body1}
            onChangeText={(text) => setBody1(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מהן כמה מהתכונות הכי מושכות שיכולות להיות לאדם"
            value={body2}
            onChangeText={(text) => setBody2(text)}
            multiline={true}
            numberOfLines={3}
            style={styles.input}
          />
          <TextInput
            placeholder="אם היית יכול לנסוע לכל מדינה בעולם לחודש אחד, לאן היית נוסע"
            value={body3}
            onChangeText={(text) => setBody3(text)}
            multiline={true}
            numberOfLines={3}
            style={styles.input}
          />
          <TextInput
            placeholder="מהם 5 הכללים המובילים שלך לחיים"
            value={body4}
            onChangeText={(text) => setBody4(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מה הדבר האהוב עליך בבית שלך / שלנו"
            value={body5}
            onChangeText={(text) => setBody5(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מהו השינוי המשמעותי ביותר שהיית רוצה לעשות בחייך"
            value={body6}
            onChangeText={(text) => setBody6(text)}
            multiline={true}
            numberOfLines={3}
            style={styles.input}
          />
          <TextInput
            placeholder="מה הכי מרגיע אותך"
            value={body7}
            onChangeText={(text) => setBody7(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מה תהיה המתנה הכי גדולה לקבל"
            value={body8}
            onChangeText={(text) => setBody8(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="מה המאכל האהוב עליך"
            value={body9}
            onChangeText={(text) => setBody9(text)}
            style={styles.input}
          />

          {/* Add more TextInput components here */}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={dataAddOn}>
          <Text style={styles.buttonText}>Add Data</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.checkmark, checkmarkStyle]}>
          <MaterialIcons name="check" size={32} color="#fff" />
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 12,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    textAlignVertical: 'top',
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
    zIndex: 1,
  },
});

export default AddData;
