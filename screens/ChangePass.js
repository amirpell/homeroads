import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
    Keyboard,
    ScrollView,
    FlatList
    
  } from "react-native";
  
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Feather } from '@expo/vector-icons';
  import Input from '../components/Input';
  import COLORS from '../const/colors';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from "expo-font";
    import React, { useState, useEffect, useCallback } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";

  const ChangePass = () => {
    const [errors, setErrors] = React.useState({});
    const [inputs, setInputs] = React.useState({ newpassword: ''});
let correntmonth=("0" + (new Date().getMonth() + 1 )).slice(-2);
let correntyear=new  Date().getFullYear();
let correntday=new  Date().getDate();

    const fullcorrentdate= `${correntyear}${correntmonth}${correntday}`


//${correntyear}${correntmonth}$

    const [newpassword, setnewPassword] = useState("");
    const navigation = useNavigation();

    

const handleOnChange = (text , input) => {
  
  setInputs((prevState) => ({...prevState, [input] : text}))
};

const handleError = (errorMessage, input) => {
  setErrors((prevState)=>({...prevState,[input]:errorMessage}))
};
 
    const user = {
      newpassword: newpassword,
    };
    const handleLogin = () => {
      Keyboard.dismiss();
  let isValid=true;
 
  if (!inputs.newpassword) {
    handleError('Please input new password', 'newpassword');
    isValid = false;
  }
   
     

      axios
        .post("http://10.0.0.10:27017/login", user)
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken", token);
          navigation.navigate("Main");
        })
        .catch((error) => 
        {
          console.log("error ", error);
        });
    };
    let [fontsLoaded] = useFonts({
      'Poppins' : require('../assets/fonts/Poppins-Regular.ttf')
    });
    useEffect(()=> {
      async function prepare() {
        await SplashScreen.preventAutoHideAsync();
      }
      prepare();
    }, [])
   
    if(!fontsLoaded){
         return undefined;
       } else {
        SplashScreen.hideAsync();
       }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
               

        <View style={{height:"30%",width:"100%",alignItems:"center",marginBottom:60}}> 

    
        <Image
    style={{alignItems:"center",position:"absolute",width:"100%",height:"100%",backgroundColor:"#ffffff", objectFit:"fill"}}
    source={require("../iconpics/icon3.png")}/>
   
     </View>
   
          <View style={{justifyContent:"center",alignItems:"center"}}>
         
        
            
                <Input
                style={{fontFamily:"Poppins",width:"80%"
                
              }}
                  value={newpassword}
                  iconName="lock"
                  label="new password"

                  onChangeText={
                    (text) => {
                      setnewPassword(text);
                      handleOnChange(text,'newpassword')
                    }
                    }
                    onFocus={()=> {
                      handleError(null, 'newpassword');
                    }}
                    error={errors.password}
                  placeholder="Enter your new password"
                  password
                />
</View>
 
           
                      <View style={{height:20}}>

                      </View>
           
          <View style={{ marginTop: 0 }} />
  
          <Pressable 
            onPress={
              handleLogin
            }
            style={{
              width: "85%",
              backgroundColor: "#539DF3",
              justifyContent:"center",
              height:48,
              marginTop: 0,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
        >
              Reset Password
            </Text>
            
          </Pressable>
          
          <Pressable style={{alignItems:"center"}} >
          
          
              </Pressable>


        </SafeAreaView>

    );
  };
  
  export default ChangePass;
  
  const styles = StyleSheet.create({
  
   
  });