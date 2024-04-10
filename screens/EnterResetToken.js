import {
    StyleSheet,
    Text,
    View,
    
    SafeAreaView,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Image,
    Alert,
    Button,
    TouchableOpacity, Option, Modal, Platform, Keyboard, ImageBackground
  } from "react-native";
  import * as SplashScreen from 'expo-splash-screen';
  import React, { useEffect, useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";

import Input from '../components/Input';
import { useFonts } from "expo-font";

  const EnterResetToken = ({ navigation, route }) => {
    const { email } = route.params;
    console.log(email);

    function handleSelection(e) {
      console.log(e);
    
    }
   

    const [changepass, setChangepass] = useState("");
   
   
    const [inputs, setInputs] = React.useState({
      changepass: '',
      email: '',



     
    });
    
    const [errors, setErrors] = React.useState({});

    const validate = () => {
      Keyboard.dismiss();
      let isValid = true;
  
      if (!inputs.changepass) {
        handleError('Please input reset token', 'changepass');
        isValid = false;
      }
   
   
      else {              
          handleRegister();

      }
      
    };
    
    const handleOnchange = (text, input) => {
      setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
    };


   
    const handleRegister = () => {
      const user = {
        changepass: changepass,
        email: email,


      };

   
       axios
      .post("http://10.0.0.10:27017/entertoken", user)
      .then((response) => {
        console.log(response);
      


          navigation.navigate("NewPassword", { email: email })
         
      })
      .catch((error) => {
       
        console.log("error", error);
      });



    
    
    ;}


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
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>

      <SafeAreaView

        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >

   
<View style={{height:"30%",width:"100%",alignItems:"center",marginBottom:60}}> 

    
<Image
    style={{alignItems:"center",position:"absolute",width:"100%",height:"100%",backgroundColor:"#ffffff", objectFit:"fill"}}
    source={require("../iconpics/icon3.png")}/>

     </View>
          
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            
          </View>
         
         
  
          <View style={{ marginTop: 0 ,marginLeft:10}}>
            <View style={{display:"none"}}>
                          <Input style={{fontFamily:"Poppins",width:"80%" }}
                value={email}
                onChangeText ={
                    (text) => {
                      setChangepass(text);
                      handleOnchange(text,'email')
                    }}
                  
              />
             </View>

              <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={changepass}
                onFocus={() => handleError(null, 'changepass')}
                onChangeText ={
                  (text) => {
                    setChangepass(text);
                    handleOnchange(text,'changepass')
                  }}
                
                  iconName="mail"
                  error={errors.changepass}
                  label="Token"
                placeholder="Enter your Token"
              />
  
            <View style={{ marginBottom: 0 }}>
                <View> 


                </View>
                

              
            </View>
          </View>
        
          <Pressable style={{ width: 300,
              backgroundColor: "#539DF3",
              justifyContent:"center",
              height:48,
              marginTop: 30,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 16,

              }} 
              
              onPress={() =>{
                validate();
              } }
              
              >

                
          <Text style={{textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",fontFamily:"Poppins"}}>Continue</Text>
        </Pressable>

        <Pressable
            onPress={() => navigation.navigate("login")}
            style={{ marginTop: 30,flexDirection:"row",alignSelf:"center"}}
          >
            <Text style={{ textAlign: "center", fontSize: 16,fontFamily:"Poppins" }}>
             back to 
            </Text>
            <Text style={{ textAlign: "center", fontSize: 16,fontFamily:"Poppins",color:"#539DF3"}}> Login</Text>
          </Pressable>
        
         
      </SafeAreaView>
      </KeyboardAvoidingView>

    );
  };
  
  export default EnterResetToken;
  
  const styles = StyleSheet.create({ container:{
    elevation:3,
    height:100,
    width:100,
    padding:0,
    justifyContent:"center",
    alignSelf:"center",
    alignItems:"center",
    borderRadius:999,
   
    
},
uploadBtnContainer:{
    
    position:'absolute',
    right:20,
    bottom:-10,
    width:'60%',
    height:'25%',
    borderColor:"#000000"
    ,borderWidth:0.5,
    borderRadius:10,
    shadowRadius: 4.65,
    elevation: 5,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    shadowColor: "#707070",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    borderWidth: 0.5,
},
uploadBtn:{
    display:'flex',
    flexDirection:"row",
    width:40,
    height:30,
    marginLeft:11,
    alignItems:"center",
    justifyContent:'center'
    
},
countrystyle:{
  elevation:2,
  height:40,
  width:200,
  backgroundColor:'#efefef',
  position:'relative',
  borderRadius:0,
  overflow:'hidden',
},
image:{
  height:100,
  width:100,
  position:"absolute"
  ,borderRadius:999
  
},
shadow:{  
   
    borderColor:"#000000"
    ,borderWidth:0.5,
    borderRadius:10,
    shadowRadius: 4.65,
    elevation: 5,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    shadowColor: "#707070",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    borderWidth: 0.5,

},

});