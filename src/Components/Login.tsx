import axios from '../Api/axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({navigation}:any) => {
  console.log("hello fro m mr");
     const [user,setUser]=useState("");
     const [pwd,setPwd]=useState("");
     const [error,setError]=useState(false);
     const [message,setMessage]=useState("");
     const handleLogin=async()=>{
     console.log({user,pwd});
     try{
     const result= await axios.post('/auth',{user,pwd},{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
     })

     console.log(result);
     }catch(error:any){
      setError(true);
      setMessage(error.message)
      console.log(`error + ${error}`);
     }
    }

     return (
    <LinearGradient colors={['#1100ff', '#0040ff']} style={styles.container}>
      
      <Text style={error? styles.show: styles.hide}></Text>
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
        <Button title="Login" onPress={handleLogin} color="#1E90FF" />
        <Button
        title="Don't Have An Account? Register"
        onPress={() => navigation.navigate('RegisterScreen')}
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
    width: 50,
    height: 50,
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

  },
  hide:{

  }
});

export default LoginScreen;
