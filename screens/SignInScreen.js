
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  async function login() {
    if (email === '' || password === '') {
      setValidationMessage('Required fields are missing');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Input
          placeholder="Email"
          containerStyle={styles.inputContainer}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="envelope" size={16} />}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.inputContainer}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />

        <Text style={styles.error}>{validationMessage}</Text>

        <Button
          title="Sign In"
          buttonStyle={styles.button}
          onPress={login}
        />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.signupLink}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
  },
  error: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontSize: 17,
  },
  signupLink: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 17,
  },
});

export default SignInScreen;