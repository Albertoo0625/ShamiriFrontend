import React from "react";
import LoginScreen from "./src/Components/Login";
import RegisterScreen from "./src/Components/Register";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MyComponent } from "./src/Context/context";
import {enableScreens} from 'react-native-screens';

import { AuthProvider } from "./src/Context/AuthContext";
import { JournalScreen } from "./src/Components/JournalScreen";

import { useLastVisitedScreen } from "./src/Hooks/useLastVisitedScreen";
import PersistLogin from "./src/Components/PersistLogin";
import { useAuth } from "./src/Hooks/useAuth";
enableScreens()


const App=()=>{
  const Stack = createNativeStackNavigator();
  const { updateLastVisitedScreen } = useLastVisitedScreen();
  const { auth } = useAuth();
  const { lastVisitedScreen } = useLastVisitedScreen();
  return (
    <>
    <AuthProvider>
    <MyComponent>
    <NavigationContainer> 
    <PersistLogin>
      <Stack.Navigator initialRouteName={auth ? lastVisitedScreen : 'LoginScreen'}  screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "", 
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="JournalScreen">
        {(props) => (
          <JournalScreen
            {...props}
            onScreenChange={(screen:any) => updateLastVisitedScreen(screen)}
          />
        )}
        </Stack.Screen>
      </Stack.Navigator>  
      </PersistLogin>
      </NavigationContainer>
    </MyComponent>
    </AuthProvider>
    </>
  )
}

export default App