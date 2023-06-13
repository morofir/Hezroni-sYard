import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MeScreen from '../screens/MeScreen';
import SyncScreen from '../screens/SyncScreen';
import PartnerScreen from '../screens/PartnerScreen';
import AsScreen from '../screens/AsScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MeScreen" component={MeScreen} />
        <Stack.Screen name="SyncScreen" component={SyncScreen} />
        <Stack.Screen name="PartnerScreen" component={PartnerScreen} />
        <Stack.Screen name="AsScreen" component={AsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
