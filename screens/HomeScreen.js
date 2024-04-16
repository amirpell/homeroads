import { StyleSheet, View ,Text,ScrollView,Pressable,Image, Modal, ImageBackground, FlatList, Platform } from "react-native";
import React, {Component, useContext, useEffect, useLayoutEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import style from '../style/style';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import {useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import Input from "../components/Input";
import { MaterialIcons } from '@expo/vector-icons';
import {  UserContext, UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import Swiper   from 'react-native-swiper'
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import WebView from "react-native-webview";
const HomeScreen = () => {







 
  
















  global.atob = decode;
  const [filterbath, setFilterbath] = useState("");
  const [homeid, setHomeid] = useState();


  const [inputs, setInputs] = React.useState({
    filterbath: '',
 


   
  });
  
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };




  const navigation = useNavigation();

    // up navigation
    useLayoutEffect(() => {

      navigation.setOptions({
        headerShown: true,
        title: (
          <Image
            style={{ alignItems: "center", position: "relative", marginBottom: 20, width: 97, height: 32, backgroundColor: "#000000", marginBottom: 30 }}
            source={require("../iconpics/icon3.png")} />
        ),
        headerTitleStyle: {
          paddingBottom: 10
  
        },
        headerStyle: {
          backgroundColor: "#0C4F84",
          height: 90,
        },
        headerRight: () => (
  
          <View>
     <Pressable style={{marginRight:15}} 
            onPress={
                logout
            }
            
          >
           <MaterialIcons name="logout" size={24} color="white" />
            
          </Pressable>
          </View>
        )
  
      })
  
    }, [])
  
  let [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const response = await axios.get("http://10.0.0.10:27017/get-homes");
      setHomes(response.data);
  //    console.log(response.data , "amirpellman")
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchHomes();

  }, []);



  const [user, setUser] = useState("");

  

  const [ userId, setUserId ] = useState("");

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://homeroads.onrender.com/profile/${userId}`
        );

        const { userinfo } = response;
        setUser(userinfo);
          console.log(response, "responser")

  
        
      } catch (error) {
      }
    };

    fetchProfile();


  });

console.log(userId,"asodkasd") 
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken =  jwtDecode(token);
     // const decodedToken = jwtDecode(token, { header: true });
      const userId = decodedToken.userId;
    //  console.log(userId ,"ttttttttrooooooooooooken")
    //  console.log(decodedToken ,"ttttttttrooooooooooooken")
      console.log(decodedToken ,"ttttttttrooooooooooooken")

    //  console.log( "fsdfasdfsdf")

     setUserId(userId);
      
    };

    fetchUsers();
  }, []);




 class YoubuteVideo extends Component {


  render() {

if(homeid?.youtube!=="" && homeid?.youtube!==null && homeid?.youtube!==undefined){
    return (
         <View style={{ height:250 , width:'100%'}}>
  <WebView
      style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
      source={{uri: 'https://www.youtube.com/embed/'+homeid?.youtube }}
  />
</View>
     
    );
}
else 
{
return(
  <View>
    
  </View>
) 
}
}
}

  const logout = () => {
    clearAuthToken();
    navigation.navigate("Welcome")
}
const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Cleared auth token");
}


  let filter =  homes.filter(baths => baths.baths>=parseInt(filterbath)
        
        
     || (baths.baths.includes(filterbath))
     
     )

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
 
  let [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    
    'PoppinsBold': require('../assets/fonts/Poppins-Bold.ttf')

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

  <SafeAreaView style={{marginTop:-20 }}>
    <View>
        <View style={style.buttonContainer}>
   
        <Pressable style={{
          flexDirection: "row", marginRight: 0, flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

                }}
                onPress={() => setModalVisible(!modalVisible)}

        >
        
          <AntDesign style={{ marginTop: 5 }} name="filter" size={24} color="black" />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ marginLeft: 20, fontWeight: 'bold', color: "#1E1E1E" }}>
              Find Your property</Text>
            <Text style={{ marginLeft: 20, color: "#8C8C8C" }}>price / bedrooms / baths</Text>

          </View>
        </Pressable>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}>

<View style={{backgroundColor:"white" , height:"100%" , width:"100%"}}>
  
<View style={{width:"100%" , display:"flex" , alignItems:"flex-start" }}>
          <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible3(!modalVisible3)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            </View>
<Swiper buttonWrapperStyle={{alignItems: 'center'}}   showsButtons={true} showsPagination={false}>

         
{homeid?.imagespack?.map((post) => (
 
<View   key={post}>

<Image style={{
          width: "100%", height: "100%",resizeMode:"contain",
          borderWidth: 0, borderColor: "#539DF3", marginTop: 0
        }}   source={{
          uri: post
        }} />


</View>



))}

</Swiper>


</View>
      </Modal>
        <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>



        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={filterbath}
                onChangeText ={
                  (text) => {
                    setFilterbath(text);
                    handleOnchange(text,'filterbath')
                  }}
                
                  label="filterbath"
                placeholder="Enter your filterbath"
              />           
               <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible(!modalVisible)
                }
               }>
              <Text style={style.textStyle}>save</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>
  
              <ScrollView  contentContainerStyle={{ flexGrow: 1 }} style={{marginBottom: 250}} >

        {filter?.map((homes) => (
          
  <View key={homes._id}
            style={{
              padding: 15,
              borderColor: "#D0D0D0",
              borderTopWidth: 0,
              flexDirection: "row",
              gap: 10,
              flex: 1,
              marginVertical: 0,
            }}
          >
                <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" , display:"flex" , alignItems:"flex-start" }}>
          <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible2(!modalVisible2)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            </View>

<ScrollView style={{marginBottom:100}}>

<View style={{height:250, display:"flex" , alignItems:"center"}}>

                

                      <Swiper buttonWrapperStyle={{alignItems: 'flex-start', marginTop:"25%"}}   showsButtons={true} showsPagination={false}>

         
            {homeid?.imagespack?.map((post) => (
             
     <View   key={post}>
 <Pressable
              
              onPress={() =>
                {
               setModalVisible3(!modalVisible3)
                }
               }>
     <Image style={{
                      width: "100%", height: "100%",resizeMode:"cover",
                      borderWidth: 0, borderColor: "#539DF3", marginTop: 0
                    }}   source={{
                      uri: post
                    }} />
              </Pressable>
   </View>
   
       
   ))}
        
      </Swiper>

    
     </View>     
         <View  style={{ flexDirection: 'row'}}>

                  <View style={{ flexDirection: 'column', marginTop: 0, marginLeft: 0 , alignItems:"center" , display:"flex",width:"100%" }}>


<YoubuteVideo/>
           


                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#1E1E1E",textAlign:"center", fontFamily:"Poppins" }}>
                    {homeid?.title}  </Text>
                    <Text style={{ fontSize: 24,textAlign:"center"  }}>€{homeid?.price}</Text>

                    <View style={{ width: "35%", marginTop: 10 }}>
                  

                    </View>


                  </View>

                

                  </View>

                  <View  style={{ flexDirection: 'row' , marginBottom: 20 , marginTop:20,display:"flex",flexDirection:"column" , alignItems:"center"}}>

          
<View style={{}}>

<Text style={{ marginLeft: 8,marginBottom: 10 , fontFamily:"Poppins" , fontSize:20  , textDecorationLine:"underline"}}>
 details</Text>
</View>
<View style={{flexWrap:"wrap",flexDirection:"row"}}>

<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 19, marginTop: 0 }}>







<FontAwesome name="bed" size={20} color="gray" />
  <View style={{ marginLeft: 7 }}>

    <Text style={{  }}>{homeid?.bedrooms}</Text>
  </View>

</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome name="bath" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homeid?.baths}</Text>



</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome5 name="ruler-combined" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homeid?.homesquremeter}</Text><Text style={{ fontSize: 10 , marginBottom:10}}>m2</Text>



</View>
<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<MaterialIcons name="numbers" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homeid?.serialnum}</Text>



</View>
</View>
<View style={{width:"90%", display:"flex",alignContent:"center" , alignItems:"center", marginTop:25}}>
<Text style={{ marginLeft: 8,marginTop: 0 , fontFamily:"Poppins" , fontSize:20 , textDecorationLine:"underline" }}>
 description</Text>
<Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homeid?.description}</Text>
</View>
<View style={{width:"90%", display:"flex",alignContent:"center" , alignItems:"center", marginTop:25}}>
<Text style={{ marginLeft: 8,marginTop: 0 , fontFamily:"Poppins" , fontSize:20 , textDecorationLine:"underline" }}>
Properties</Text>
<Text style={{ marginLeft: 8,marginTop: 0 }}>
Properties</Text>
</View>

                  </View>



            </ScrollView>



          </View>
   
        </View>
      </Modal>
            <ScrollView style={style.card}  >
            <Pressable   onPress={() =>
            {
               setModalVisible2(!modalVisible2),
               setHomeid(homes);
               
            }
               }>
                 <View style={{}}>


                  <ImageBackground
                    style={{
                      width: "100%", height: 250,
                       marginTop: 0
                    }}
                    imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 0,
                      borderColor: "#539DF3",
                    }}
                    source={{uri :
                    homes.images}}
                   >
<View style={{ alignSelf: 'flex-start', gap:5, flexDirection:"row",margin:15,flexWrap:"wrap" }}>
{homes.proptags?.map((homes) => (
<Text  key={homes} style={{backgroundColor: '#18181999',color: '#ffffff',padding:5, borderRadius:5}}>
  {homes}
 </Text>
))}

</View>
                   </ImageBackground>
        

                


<View  style={{ flexDirection: 'row'}}>
                  <View style={{ flexDirection: 'column', marginTop: 14, marginLeft: 14 }}>






                    <Text style={{ fontSize: 24, color: "#1E1E1E" , fontFamily:"PoppinsBold"}}>
                    {homes.title}  </Text>
                    <Text style={{   fontFamily:"Poppins"}}>€{homes.price}</Text>

                    <View style={{ width: "35%", marginTop: 10 }}>
                  

                    </View>


                  </View>

                

                  </View>
                  <View  style={{ flexDirection: 'row' , marginBottom: 20 , marginTop:20}}>

          

<View style={{flexWrap:"wrap",flexDirection:"row"}}>
<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 19, marginTop: 0 }}>







<FontAwesome name="bed" size={20} color="gray" />
  <View style={{ marginLeft: 7 }}>

    <Text style={{  }}>{homes.bedrooms}</Text>
  </View>

</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome name="bath" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.baths}</Text>



</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome5 name="ruler-combined" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.homesquremeter}</Text><Text style={{ fontSize: 10 , marginBottom:10}}>m2</Text>



</View>
<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<MaterialIcons name="numbers" size={20} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.serialnum}</Text>



</View>
</View>

                  </View>
                </View>
             
</Pressable>

            </ScrollView>

          </View>

))}
          </ScrollView>
          </View>
  </SafeAreaView>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
 

});