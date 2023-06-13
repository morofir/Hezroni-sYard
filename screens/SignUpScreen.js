import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  let validateAndSet = (value, setValue) => {
    setValue(value);
  };

  function checkPassword(firstPassword, secondPassword) {
    if (firstPassword !== secondPassword) {
      setValidationMessage('Passwords do not match');
    } else {
      setValidationMessage('');
    }
  }

  async function createAccount() {
    if (email === '' || password === '' || confirmPassword === '') {
      setValidationMessage('Required fields are missing');
      return;
    }

    if (password !== confirmPassword) {
      setValidationMessage('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

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
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
          leftIcon={<Icon name="key" size={16} />}
        />

        <Input
          placeholder="Confirm Password"
          containerStyle={styles.inputContainer}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value, setConfirmPassword)}
          secureTextEntry
          leftIcon={<Icon name="key" size={16} />}
          onBlur={() => checkPassword(password, confirmPassword)}
        />

        <Text style={styles.error}>{validationMessage}</Text>

        <Button
          title="Sign Up"
          buttonStyle={styles.button}
          onPress={createAccount}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.loginLink}>Login here</Text>
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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    fontSize: 17,
  },
  loginLink: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 17,
  },
});

export default SignUpScreen;