import { Header } from "react-native/Libraries/NewAppScreen"
import axios from "../../Api/axios"
import { Text, View } from "react-native"
import { useEffect } from "react"

export const Journal=()=>{
  useEffect(()=>{
    const getEntries=async()=>{
      const response=await axios.get('/journal',{
        headers:{"Content=Type":"application/json"},
        withCredentials:true
      });

      console.log(response)
    }
    getEntries();
  },[])

return(
  <View>
    <Text>Hello from Journal</Text>
  </View>
)

}