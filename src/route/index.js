import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from '../screens/ContactScreen';
import DetailContactScreen from '../screens/DetailContactScreen';
import AddNewContactScreen from '../screens/AddNewContactScreen';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailContactScreen"
        component={DetailContactScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewContactScreen"
        component={AddNewContactScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
