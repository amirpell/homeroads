import { StyleSheet, View ,Text,ScrollView,Pressable,Image, Modal, ImageBackground } from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
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

const HomeScreen = () => {
  const [filterbath, setFilterbath] = useState("");

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
  
          <View></View>
        )
  
      })
  
    }, [])
  
  let [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const response = await axios.get("https://homeroads-d3dd3d7877d2.herokuapp.com:27017/get-homes");
      setHomes(response.data);
      console.log(response.data , "amirpellman")
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchHomes();

  }, []);

  let filter =  homes.filter(baths => baths.baths>=parseInt(filterbath)
        
        
     || (baths.baths.includes(filterbath))
     
     )

  const [modalVisible, setModalVisible] = useState(false);

 

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
            <ScrollView style={style.card}  >

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
<Text style={{backgroundColor: '#000000',color: '#ffffff',padding:5, borderRadius:5}}>
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







<FontAwesome name="bed" size={24} color="gray" />
  <View style={{ marginLeft: 7 }}>

    <Text style={{  }}>{homes.bedrooms}</Text>
  </View>

</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome name="bath" size={24} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.baths}</Text>



</View>

<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<FontAwesome5 name="ruler-combined" size={24} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.homesquremeter}</Text><Text style={{ fontSize: 10 , marginBottom:10}}>m2</Text>



</View>
<View style={{ flexDirection: 'row',alignItems: 'center', marginLeft: 19, marginTop: 0 }}>
<MaterialIcons name="numbers" size={24} color="gray" />
  <Text style={{ marginLeft: 8,marginTop: 0 }}>
 {homes.serialnum}</Text>



</View>
</View>

                  </View>
                </View>
             


            </ScrollView>

          </View>

))}
          </ScrollView>

  </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
 

});