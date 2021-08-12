import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddNewContactScreen,
  ContactScreen,
  DetailContactScreen,
} from '../screens';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
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
