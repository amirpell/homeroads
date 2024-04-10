import { StyleSheet, View ,Text,ScrollView,Pressable,Image, Modal, ImageBackground, FlatList } from "react-native";
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
const GuestScreen = () => {







 
  
















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
     <Pressable 
            onPress={
                logout
            }
            
          >
            <Text
              style={{
                
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
        >
              clear
            </Text>
            
          </Pressable>
          </View>
        )
  
      })
  
    }, [])
  
  let [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const response = await axios.get("https://homeroads.onrender.com/get-homes");
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

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];


  return (

  <SafeAreaView style={{marginTop:-20}}>
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
        animationType="slide"
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
  
              <ScrollView  contentContainerStyle={{ flexGrow: 1 }} style={{marginBottom: 150}} >

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
        animationType="slide"
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
                      <Swiper buttonWrapperStyle={{alignItems: 'flex-start', marginTop:"25%"}}   showsButtons={true} showsPagination={false}>

         
            {homeid?.imagespack?.map((post) => (
             
     <View   key={post}>
 
     <Image style={{
                      width: "100%", height: "70%",
                      borderWidth: 0, borderColor: "#539DF3", marginTop: 0
                    }}   source={{
                      uri: post
                    }} />
              
   </View>
   
            ))}

        
      </Swiper>
          
         
            <Text>{homeid?.price}</Text>  
            <Text>{homeid?.description}</Text>   
         
           
          
          
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






                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#1E1E1E" }}>
                    {homes.title}  </Text>
                    <Text style={{ }}>€{homes.price}</Text>

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

  </SafeAreaView>
  );
};

export default GuestScreen;

const styles = StyleSheet.create({
 

});