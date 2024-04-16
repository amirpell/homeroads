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

  const Login = () => {
    const [errors, setErrors] = React.useState({});
    const [inputs, setInputs] = React.useState({email: '', password: ''});
let correntmonth=("0" + (new Date().getMonth() + 1 )).slice(-2);
let correntyear=new  Date().getFullYear();
let correntday=new  Date().getDate();

    const fullcorrentdate= `${correntyear}${correntmonth}${correntday}`


//${correntyear}${correntmonth}$

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    

const handleOnChange = (text , input) => {
  
  setInputs((prevState) => ({...prevState, [input] : text}))
};

const handleError = (errorMessage, input) => {
  setErrors((prevState)=>({...prevState,[input]:errorMessage}))
};
    useEffect(() => {
      
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
  
          if (token) {
            setTimeout(() => {
              navigation.replace("Admin");
            }, 400);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
  
      checkLoginStatus();
    }, []);
    const user = {
      email: email,
      password: password,
    };
    const handleLogin = () => {
      Keyboard.dismiss();
  let isValid=true;
  if (!inputs.email) {
    handleError('Please input email', 'email');
    isValid = false;
  } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    handleError('Please input a valid email', 'email');
    isValid = false;
  }
else  if (!inputs.password) {
    handleError('Please input password', 'password');
    isValid = false;
  }
   
 else {    

      axios
        .post("http://10.0.0.10:27017/login", user)
        .then((response) => {
          console.log(response);
          const token = response.data.data;
          console.log(response.data.data)
          AsyncStorage.setItem("authToken", token);
          navigation.navigate("Admin");
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
         
              <Input
                          iconName="mail"
                          label="Email"

                value={email}
               onChangeText ={
                  (text) => {
                    setEmail(text);
                    handleOnChange(text,'email')
                  }
                  }
                  onFocus={()=> {
                    handleError(null, 'email');
                  }}
                  error={errors.email}

                placeholderTextColor={"gray"}
                style={{fontFamily:"Poppins",width:"80%"
                
                }}
                placeholder="Enter your email"
                
              />
  
            
                <Input
                style={{fontFamily:"Poppins",width:"80%"
                
              }}
                  value={password}
                  iconName="lock"
                  label="Password"

                  onChangeText={
                    (text) => {
                      setPassword(text);
                      handleOnChange(text,'password')
                    }
                    }
                    onFocus={()=> {
                      handleError(null, 'password');
                    }}
                    error={errors.password}
                  placeholder="Enter your password"
                  password
                />
</View>
 
             <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ flexDirection:"row",justifyContent:"center"}}
          >
            <Text style={{ textAlign: "center", fontSize: 16 ,marginTop:15, fontFamily:"Poppins"}}>
              Don't have an account? 
            </Text>
            <Text style={{color:"#539DF3",textAlign: "center", fontSize: 16,marginTop:15, fontFamily:"Poppins" }}>
               Sign up</Text>
          </Pressable>
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
              Login
            </Text>
            
          </Pressable>
          
          <Pressable  onPress={() => navigation.navigate("UserEmailToReset")}  style={{alignItems:"center"}} >
          
            <Text style={{ fontWeight: "400", color: "#007FFF" ,    fontFamily:"Poppins",marginTop:5}}>
              
                Forgot Password?
              </Text>
              </Pressable>


        </SafeAreaView>

    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
  
   
  });