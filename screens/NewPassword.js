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

  const NewPassword = ({ navigation, route }) => {
    const [errors, setErrors] = React.useState({});
    const [inputs, setInputs] = React.useState({ newpassword: '' , newpasswordagain: '', email : ''});

    const { email } = route.params;




    const [newpassword, setnewPassword] = useState("");
    const [newpasswordagain, setnewPasswordAgain] = useState("");

    

const handleOnChange = (text , input) => {
  
  setInputs((prevState) => ({...prevState, [input] : text}))
};

const handleError = (errorMessage, input) => {
  setErrors((prevState)=>({...prevState,[input]:errorMessage}))
};
 
    const user = {
      newpassword: newpassword,
      newpasswordagain:newpasswordagain,
      email:email
    };
    const handleLogin = () => {
      Keyboard.dismiss();
  let isValid=true;
 
  if (!inputs.newpassword) {
    handleError('Please input new password', 'newpassword');
    isValid = false;
  }
    
  else if (!inputs.newpasswordagain) {
    handleError('Please input new password', 'newpasswordagain');
    isValid = false;
  }
   
  else if (inputs.newpasswordagain!==inputs.newpassword) {
    handleError('password dosnt match', 'newpasswordagain');
    isValid = false;
  }
   
else{
      axios
        .post("http://10.0.0.10:27017/updatepassword", user)
        .then((response) => {
            if(response.seccess)
          console.log(response);
          Alert.alert(
            "Password changed"
          );
          navigation.navigate("login");
        })
        .catch((error) => 
        {
          console.log("error ", error);
        });
    }
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
            <View style={{justifyContent:"center",alignItems:"center",display:"none"}}>
          <Input
                style={{fontFamily:"Poppins",width:"80%"
                
              }}
                  value={email}
                

                  onChangeText={
                    (text) => {
                      setEmail(text);
                      handleOnChange(text,'email')
                    }
                    }
                   
                />
                </View>
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
                    error={errors.newpassword}
                  placeholder="Enter your new password"
                  password
                />
            
                <Input
                style={{fontFamily:"Poppins",width:"80%"
                
              }}
                  value={newpasswordagain}
                  iconName="lock"
                  label="new password again"

                  onChangeText={
                    (text) => {
                        setnewPasswordAgain(text);
                      handleOnChange(text,'newpasswordagain')
                    }
                    }
                    onFocus={()=> {
                      handleError(null, 'newpasswordagain');
                    }}
                    error={errors.newpasswordagain}
                  placeholder="Enter your new password again"
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
  
  export default NewPassword;
  
  const styles = StyleSheet.create({
  
   
  });