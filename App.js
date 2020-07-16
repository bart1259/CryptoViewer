import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import CryptoBrowserScreen from './components/CrpytoBrowserScreen'
import CryptoInfoScreen from './components/CryptoInfoScreen'

const Stack = createStackNavigator();

const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red'
  },
};

function App() {
  return (
    <NavigationContainer theme={NavigatorTheme}>
     <Stack.Navigator>
        <Stack.Screen 
          name="Browse" 
          component={CryptoBrowserScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        <Stack.Screen 
          name="Info" 
          component={CryptoInfoScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;