import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from '../Api/axios';

const RegisterScreen = ({navigation}:any) => {
     const [user,setUser]=useState("");
     const [pwd,setPwd]=useState("");
     const [email,setEmail]=useState("");


     const handleRegister=async()=>{
     console.log({user,pwd,email});
     const response=await axios.post('/register',{user,pwd,email},{
      headers:{
        "Content-Type":"application/json"
      },
     });
     console.log(response.data);
     navigation.navigate("LoginScreen");
    }
  return (
    <LinearGradient colors={['#1100ff', '#0040ff']} style={styles.container}>
       <Image
        style={styles.tinyLogo}
        source={require('../Public/Images/shamiri_institute_logo.jpg')}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#ffffff" 
        onChangeText={(text) => setUser(text)}
        value={user}
        />
        <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#ffffff" 
        onChangeText={(text) => setEmail(text)}
        value={email}
        />
        <TextInput
         style={styles.input} 
         placeholder="Password" 
         placeholderTextColor="#ffffff" 
         secureTextEntry 
         value={pwd}
         onChangeText={(text)=>{setPwd(text)}}
         />
         
        <Button title="Register" 
        onPress={handleRegister} 
        color="#1E90FF" />
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
});

export default RegisterScreen;
