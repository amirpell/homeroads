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

  const Register = () => {

    function handleSelection(e) {
      console.log(e);
    
    }
    let correntmonth=("0" + (new Date().getMonth() + 1 )).slice(-2);
    let correntyear=new  Date().getFullYear();
    let correntday=new  Date().getDate();
    
        const fullcorrentdate= `${correntyear}${correntmonth}${correntday}`;
        const fulluserdate= `${year}${month}${day}`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [profileimage, setPofileimage] 
    = useState(null);
    const [country, setCountry] = React.useState("");
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblesec, setModalVisiblesec] = useState(false);

   
    const [hidePassword, setHidePassword] = React.useState(password);
    const [inputs, setInputs] = React.useState({
      email: '',
      password:'',
    


     
    });
    
    const [errors, setErrors] = React.useState({});

    const validate = () => {
      Keyboard.dismiss();
      let isValid = true;
  
      if (!inputs.email) {
        handleError('Please input email', 'email');
        isValid = false;
      }
       else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        handleError('Please input a valid email', 'email');
        isValid = false;
      }
      else if  (!inputs.password) {
        handleError('Please input password above 6 characters', 'password');
        isValid = false;
      }
      else if(password.length < 6)
      {
        handleError('Please input password above 6 characters', 'password');
      

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


   
    const navigation = useNavigation();
    const handleRegister = () => {
      const user = {
        email: email,
        password: password,
      

      };
 

   
      axios
        .post("http://10.0.0.10:27017/register", user)
        .then((response) => {
          console.log(response);
        


          setEmail("");
         setPassword("");
            navigation.navigate("EmailVerfication")
           
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
            
             
              <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={email}
                onFocus={() => handleError(null, 'email')}
                onChangeText ={
                  (text) => {
                    setEmail(text);
                    handleOnchange(text,'email')
                  }}
                
                  iconName="mail"
                  error={errors.email}
                  label="Email"
                placeholder="Enter your email"
              />
  
            <View style={{ marginBottom: 0 }}>
                <View> 


                </View>
                <Input style={{fontFamily:"Poppins",width:"80%"}}
                  value={password}
                  iconName="lock"
                  label="Password"

                  onChangeText={
                    (text) => {
                      setPassword(text);
                      handleOnchange(text,'password')
                    }
                    }
                    onFocus={()=> {
                      handleError(null, 'password');
                    }}
                    
                    
                    error={errors.password}
                  placeholder="enter your Password"
                  password
                />

              
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate("login")}
            style={{ marginTop: 30,flexDirection:"row",alignSelf:"center"}}
          >
            <Text style={{ textAlign: "center", fontSize: 16,fontFamily:"Poppins" }}>
              Already have an account?
            </Text>
            <Text style={{ textAlign: "center", fontSize: 16,fontFamily:"Poppins",color:"#539DF3"}}> Sign In</Text>
          </Pressable>
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

     
        
         
      </SafeAreaView>
      </KeyboardAvoidingView>

    );
  };
  
  export default Register;
  
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