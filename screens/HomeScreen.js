import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function HomeScreen({ navigation }) {
  const { user } = useAuthentication();

  return (
    <ImageBackground source={require('../assets/rekaus_love.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome {user?.email}!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeScreen')}>
          <Text style={styles.buttonText}>אני</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartnerScreen')}>
          <Text style={styles.buttonText}>בן או בת הזוג</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AsScreen')}>
          <Text style={styles.buttonText}>אנחנו</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SyncScreen')}>
          <Text style={styles.buttonText}>תשובות שהתקבלו</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={() => signOut(auth)}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Change the background color to 'transparent'
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  signOutButton: {
    backgroundColor: '#E91E63',
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
