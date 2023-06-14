import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db, auth } from '../config/firebase';
import { sRef, onValue } from '../utils/hooks/firebaseDatabase';

const NewFeature = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            // Retrieve user data from Firebase database
            const userDataRef = sRef(db, `users/${user.uid}`);
            onValue(userDataRef, (snapshot) => {
                const fetchedUserData = snapshot.val();
                setUserData(fetchedUserData);
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Text style={styles.title}>User Data</Text>
                    <Text style={styles.label}>Questions:</Text>
                    <Text>{userData.questions}</Text>
                    <Text style={styles.label}>Answers:</Text>
                    <Text>{userData.answers}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text>{userData.email}</Text>
                    <Text style={styles.label}>Phone:</Text>
                    <Text>{userData.phone}</Text>
                </>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default NewFeature;
