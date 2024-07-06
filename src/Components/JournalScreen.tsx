import { useState } from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import axios from "../Api/axios";



export const JournalScreen=({navigation}:any)=>{
    const [text,setText]=useState("");

    const handleSubmit=async ()=>{
      const result=await axios.post('/journal',{text})
    }

return(
    <LinearGradient colors={['#1100ff', '#0040ff']} style={styles.container}>
       <View>
        <Image
        source={require('../Public/Images/shamiri_institute_logo.jpg')}>
        </Image>
       <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => setText(text)}
        value={text}
        style={{padding: 10}}
      />
      <Button title="Save Thought" onPress={handleSubmit}></Button>

       </View>
    </LinearGradient>
)
}

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
  });