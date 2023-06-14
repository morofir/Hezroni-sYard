import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MeScreen from '../screens/MeScreen';
import SyncScreen from '../screens/SyncScreen';
import PartnerScreen from '../screens/PartnerScreen';
<<<<<<< Updated upstream
import AsScreen from '../screens/AsScreen';
=======
import SearchPage from '../screens/SearchPage';
import NewFeature from '../screens/NewFeature';
>>>>>>> Stashed changes

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MeScreen" component={MeScreen} />
        <Stack.Screen name="SyncScreen" component={SyncScreen} />
        <Stack.Screen name="PartnerScreen" component={PartnerScreen} />
<<<<<<< Updated upstream
        <Stack.Screen name="AsScreen" component={AsScreen} />
=======
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="NewFeature" component={NewFeature} />
>>>>>>> Stashed changes
      </Stack.Navigator>
    </NavigationContainer>
  );
}
