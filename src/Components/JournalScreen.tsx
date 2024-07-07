import { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "../Api/axios";

export const JournalScreen = ({ navigation, onScreenChange }: any) => {
  const [text, setText] = useState("");

  useEffect(() => {
    onScreenChange('JournalScreen');
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await axios.post('/journal', { text }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      Alert.alert('Success', 'Your thought has been saved.');
    } catch (error) {
      console.error('Error saving thought', error);
      Alert.alert('Error', 'There was a problem saving your thought.');
    }
  }

  return (
    <LinearGradient colors={['#1100ff', '#0040ff']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../Public/Images/shamiri_institute_logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Journal Your Thoughts</Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={200}
          onChangeText={setText}
          value={text}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Thought</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0066cc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
