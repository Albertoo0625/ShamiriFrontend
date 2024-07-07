import axios from '../Api/axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, Alert, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../Hooks/useAuth';
import { useAppContext } from '../Hooks/useAppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}:any) => {
  console.log("hello fro m mr");
     const [user,setUser]=useState("");
     const [pwd,setPwd]=useState("");
     const [error,setError]=useState(false);
     const [message,setMessage]=useState("");
     const {auth,setAuth}=useAuth();
     const {state,setState}=useAppContext();

     const toggleSwitch = async() => {       
      setState((prevState) => ({
        ...prevState,
        persist: !state.persist,
      }));

      console.log(`persist value ${state.persist}`);
      await AsyncStorage.setItem("persist", JSON.stringify(state.persist));
    };

    useEffect(() => {
      const fetchValue = async () => {
        const storedValue = await AsyncStorage.getItem('persist');
        if (storedValue) {
          setState(prevState => ({
            ...prevState,
            persist: JSON.parse(storedValue),
          }));
        }
      };
  
      fetchValue();
    }, []);

     const handleLogin=async()=>{
     console.log({user,pwd});
     if(!user || !pwd){
      Alert.alert("Please Fill all fields");
     }else{
      try{
        const result= await axios.post('/auth',{user,pwd},{
         headers:{
           "Content-Type":"application/json"
         },
         withCredentials:true
        })
        
        console.log(result.data);
   
        let accessToken=result?.data?.accessToken;
        let roles=result?.data?.roles;
   
        console.log({user, pwd, roles, accessToken});
        setAuth( {user, pwd, roles, accessToken} );
        
        navigation.navigate('JournalScreen')

        }catch(error:any){
         setError(true);
         const errorMsg = error.response?.data?.message || error.message;
         setMessage(errorMsg);
        }
      } 
    }

     return (
    <LinearGradient colors={['#1100ff', '#0040ff']} style={styles.container}>
      <View>
      <Text style={error? styles.show: styles.hide}>
        <Text>{message}</Text>
      </Text>
      </View>
       <Image
        style={styles.tinyLogo}
        source={require('../Public/Images/shamiri_institute_logo.jpg')}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#ffffff" 
        onChangeText={(text) => setUser(text)}
        value={user}
        />
        <TextInput
         style={styles.input} 
         placeholder="Password" 
         placeholderTextColor="#ffffff" 
         secureTextEntry 
         value={pwd}
         onChangeText={(text)=>{setPwd(text)}}
         />

      <View style={styles.buttonContainer}>
        <Button 
        title="Login" 
        onPress={handleLogin} 
        color="#1E90FF" 
       />
      </View>

      <View style={styles.buttonContainer}>
        <Button
        title="Don't Have An Account? Register"
        onPress={() => navigation.navigate('RegisterScreen')}
        />
      </View>

        <Text style={styles.titles}>Trust This Device</Text>
        <Switch
        style={styles.switch}
        value={state.persist}
        onValueChange={toggleSwitch}
      />

      </View>
      
    </LinearGradient>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginBottom:10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#ffffff',
  },
  show:{
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  hide: {
    display: 'none',
  },
  switch: {
    margin: 10,
    alignSelf:"flex-start"
  },
  buttonContainer: {
    margin: 10,
  },
  titles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft:10,
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default LoginScreen;