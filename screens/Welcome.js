import { Button, Pressable, StyleSheet ,Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Welcome = () => {

    const navigation = useNavigation();

  


  
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("Cleared auth token");
    }


 
  return (

   <SafeAreaView>

<Text>welcome</Text>
   
<Pressable
         
         onPress={() => navigation.navigate("login")}
         
         style={{
           width: "85%",
           backgroundColor: "#539DF3",
           padding: 15,
           marginTop: 10,
           height:"100",
           marginLeft: "auto",
           marginRight: "auto",
           borderRadius: 8,
         }}
       >
         <Text
           style={{
             textAlign: "center",
             justifyContent:"center",
             marginTop:-8,
             fontWeight: "bold",
             fontSize: 16,
             color: "white",
           }}
         >
           Login
         </Text>
       </Pressable>
       <Pressable
         
         onPress={() => navigation.navigate("Register")}
         
         style={{
           width: "85%",
           backgroundColor: "#539DF3",
           padding: 15,
           marginTop: 10,
           height:"100",
           marginLeft: "auto",
           marginRight: "auto",
           borderRadius: 8,
         }}
       >
         <Text
           style={{
             textAlign: "center",
             justifyContent:"center",
             marginTop:-8,
             fontWeight: "bold",
             fontSize: 16,
             color: "white",
           }}
         >
           guest
         </Text>
       </Pressable>
</SafeAreaView>

  );
};

export default Welcome;

const styles = StyleSheet.create({
 

});