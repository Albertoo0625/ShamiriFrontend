import React from "react";
import LoginScreen from "./src/Components/Login";
import RegisterScreen from "./src/Components/Register";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MyComponent } from "./src/Context/context";
import {enableScreens} from 'react-native-screens';

import { AuthProvider } from "./src/Context/AuthContext";
import { JournalScreen } from "./src/Components/JournalScreen";
enableScreens()


const App=()=>{
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
    <MyComponent>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="JournalScreen" component={JournalScreen} />
      </Stack.Navigator>  
    </NavigationContainer>
    </MyComponent>
    </AuthProvider>
  )
}

export default App