import { Header } from "react-native/Libraries/NewAppScreen"
import axios from "../../Api/axios"
import { Text, View } from "react-native"
import { useEffect, useState } from "react"

export const Journal=()=>{
  const [entries,setEntries]=useState([]);
  useEffect(()=>{
    const getEntries=async()=>{
      const response=await axios.get('/journal',{
        headers:{"Content=Type":"application/json"},
        withCredentials:true
      });

      console.log(response.data);
      setEntries(response.data);
    }
    getEntries();
  },[])

return(
  <View>
    <Text>Hello from Journal</Text>
  </View>
)

}