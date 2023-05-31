import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, setDoc, query } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {
  const { user } = useAuthentication();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  const connectWithUser = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      if (!selectedUser) {
        console.log('No user selected');
        return;
      }

      const connectionsRef = collection(firestore, 'connections');
      const newConnectionRef = doc(connectionsRef);
      const newConnectionKey = newConnectionRef.id;

      const connectionData = {
        connectionId: newConnectionKey,
        senderUserId: currentUser.email,
        receiverUserId: selectedUser.email,
        status: 'pending',
      };

      await setDoc(newConnectionRef, connectionData);

      console.log('Connection created successfully');
    } catch (error) {
      console.error('Error connecting with user:', error);
    }
  };

  async function fetchUsers() {
    console.log('Fetching users...');
  
    try {
      const q = query(collection(firestore, 'users'));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('No other users found');
        return;
      }
  
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUserOptions(users);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  

  const handleUserSelect = (value) => {
    setSelectedUser(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeScreen')}>
        <Text style={styles.buttonText}>אני</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartnerScreen')}>
        <Text style={styles.buttonText}>בן או בת הזוג</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchUsers}>
        <Text style={styles.buttonText}>{selectedUser ? selectedUser.email : 'אנחנו'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>העולם</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SyncScreen')}>
        <Text style={styles.buttonText}>סנכרון עם משתמש</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={() => signOut(auth)}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={handleUserSelect}
            >
              <Picker.Item label="Select a user..." value={null} />
              {userOptions.map((user) => (
                <Picker.Item key={user.email} label={user.email} value={user} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
  },
});
