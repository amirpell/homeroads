
import Input from '../components/Input';
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
    TouchableOpacity, Option, Modal, Platform, Keyboard, ImageBackground, ScrollView, FlatList
  } from "react-native";
  import React, { useEffect, useState,Component, } from "react";

  import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import MultiSelect from 'react-native-multiple-select';
import Carousel from 'react-native-snap-carousel';

const AddHome = () => {
  
  const items = [{
    name: 'Sold'
  }, {
    name: 'For Sale'
  }, {
    name: 'For Rent'
  }, {
    name: 'Holiday Rental'
  }
  ];
  var [proptags, setProptags] = useState([]);

  class Multiselect extends Component {
    state = {
      tags : []
    };
    
    onSelectedItemsChange = tags => {
      this.setState({ tags });
    };


    render() {

      const { tags } = this.state;
      proptags = tags
      return (
        <View style={{ flex: 1 }}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="name"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={tags}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> 
              setTord(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <View>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(tags)}
  
  </View>
        </View>
      );
    }
  }















  
  let [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf')
  });
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
          canceled:false,
       width:1080,
       type:"image",
       height:810
        });
      
      //  console.log(JSON.stringify(_image));
        if (!_image.canceled) {
            console.log(_image.assets[0].uri, "amirelllmansd")
          setImages(_image.assets[0].uri);
          }
    
      
      }
    const [name, setName] = useState("");
    const [images, setImages] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [baths, setBaths] = useState("");
    const [homesquremeter, setHomesquremeter] = useState("");
    const [propetysquremeter, setPropetysquremeter] = useState("");
    const [serialnum, setSerialnum] = useState("");
    const [state, setState] = useState("");
    const [region, setRegion] = useState("");
    const [street, setStreet] = useState("");

    const [inputs, setInputs] = React.useState({
        name: '',
        images: '',
        bedrooms: '',
        homesquremeter: '',
        baths: '',
        propetysquremeter: '',
        serialnum: '',
        state: '',
        region: '',
        street: '',
        
       
      });
  
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
  
      const handletest = () => {
        console.log(proptags)
        }
    
          const handleAddhome = () => {
            const home = {
              name: name,
              images : images,
              description : description,
              title : title,
              price : price,
              bedrooms:bedrooms ,
              homesquremeter: homesquremeter,
              baths:baths ,
              propetysquremeter: propetysquremeter,
              serialnum: serialnum,
              state: state,
              region: region,
              street: street,
              proptags:proptags,
              imagespack:imagespack
            };
            {
            axios
              .post("https://homeroads.onrender.com/addhome", home)
              .then((response) => {
                console.log(response);
              
      
                setImages("");
                setDescription("");
                setPrice("");
                setTitle("");
                setName("");

                setBedrooms("");
                setHomesquremeter("");
                setPropetysquremeter("");
                setSerialnum("");
                setRegion("");
                setBaths("");
                setProptags(proptags);

                setState("");
                setImagespack(imagespack)
                setStreet("");

                 
              })
              .catch((error) => {
                Alert.alert(
                  "Registration failed",
                  "An error occurred during registration"
                );
                console.log("error", error);
              });
      
      
          }
          
          
          ;}
          const [imagespack, setImagespack] = useState([]);

          const pickImage = async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsMultipleSelection: true,
                  aspect: [1, 1],
                  quality: 1,
              });
              
              if (!result.canceled) {
                  const selectedImageUris = result.assets.map((asset) => asset.uri);
                  setImagespack(selectedImageUris);
                  console.log(selectedImageUris)
              }
          }
  return (

    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>


    <SafeAreaView

      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
<View style={{marginBottom:100 }}>

<View style={{height:"5%",width:"100%",alignItems:"center"}}> 


   </View>

   <ScrollView>
      
        <View style={{ marginTop: 0 ,marginLeft:10}}>
          
        <Multiselect/>

        <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={name}
                onChangeText ={
                  (text) => {
                    setName(text);
                    handleOnchange(text,'name')
                  }}
                
                  label="name"
                placeholder="Enter your name"
              />
    <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={title}
                onChangeText ={
                  (text) => {
                    setTitle(text);
                    handleOnchange(text,'title')
                  }}
                
                  label="title"
                placeholder="Enter your title"
              />
                 <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={price}
                onChangeText ={
                  (text) => {
                    setPrice(text);
                    handleOnchange(text,'price')
                  }}
                
                  label="price"
                placeholder="Enter your price"
              />
                 <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={description}
                onChangeText ={

                  (text) => {
                    setDescription(text);
                    handleOnchange(text,'description')
                  }}
                
                  label="description"
                placeholder="Enter your description"
              />





<Input style={{fontFamily:"Poppins",width:"80%"}}
                value={bedrooms}
                onChangeText ={
                  (text) => {
                    setBedrooms(text);
                    handleOnchange(text,'bedrooms')
                  }}
                
                  label="bedrooms"
                placeholder="Enter your bedrooms"
              />

<Input style={{fontFamily:"Poppins",width:"80%"}}
                value={homesquremeter}
                onChangeText ={
                  (text) => {
                    setHomesquremeter(text);
                    handleOnchange(text,'homesquremeter')
                  }}
                
                  label="homesquremeter"
                placeholder="Enter your homesquremeter"
              />
       <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={street}
                onChangeText ={
                  (text) => {
                    setStreet(text);
                    handleOnchange(text,'street')
                  }}
                
                  label="street"
                placeholder="Enter your street"
              />
       <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={region}
                onChangeText ={
                  (text) => {
                    setRegion(text);
                    handleOnchange(text,'region')
                  }}
                
                  label="region"
                placeholder="Enter your region"
              />
       <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={state}
                onChangeText ={
                  (text) => {
                    setState(text);
                    handleOnchange(text,'state')
                  }}
                
                  label="state"
                placeholder="Enter your state"
              />
       <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={serialnum}
                onChangeText ={
                  (text) => {
                    setSerialnum(text);
                    handleOnchange(text,'serialnum')
                  }}
                
                  label="serialnum"
                placeholder="Enter your serialnum"
              />
       <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={baths}
                onChangeText ={
                  (text) => {
                    setBaths(text);
                    handleOnchange(text,'baths')
                  }}
                
                  label="baths"
                placeholder="Enter your baths"
              />
        </View>

        <View style={styles.container}>
           
          
                  <ImageBackground>
                <Image
                 style={{
                  
                   width: 100,
                   height: 100,
                   borderRadius: 20,
                   resizeMode: "contain",
                 }}
                 source={require(
                  "../iconpics/addimage.jpg",
    )}
               />
               </ImageBackground>  
               {
            
            images  && <Image style={styles.image} source={{uri: images}} />
            
        }
                     <View style={styles.uploadBtnContainer}>
                     
                         <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                         <Feather name="camera" size={24} color="black"
                          style={{fontSize:15,marginBottom:9,marginRight:5}}/>

                             <Text style={{fontSize:12,marginBottom:9,fontWeight:"bold"
                             ,shadowOpacity: 0.27,
   
    }}>{images ? 'Edit' : 'Add'} </Text>
         </TouchableOpacity>
       
                     </View>
                     
             </View>
             <View style={styles.container}>
           
          
           <ImageBackground>
         <Image
          style={{
           
            width: 100,
            height: 100,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={require(
           "../iconpics/addimage.jpg",
)}
        />
        </ImageBackground>  
        {
     
     images  && <Image style={styles.image} source={{uri: images}} />
     
 }
              <View style={styles.uploadBtnContainer}>
              
                  <TouchableOpacity onPress={pickImage} style={styles.uploadBtn} >
                  <Feather name="camera" size={24} color="black"
                   style={{fontSize:15,marginBottom:9,marginRight:5}}/>

                      <Text style={{fontSize:12,marginBottom:9,fontWeight:"bold"
                      ,shadowOpacity: 0.27,

}}>{images ? 'Edit' : 'Add'} </Text>
  </TouchableOpacity>

              </View>
              
      </View>
             <FlatList
                horizontal
                data={imagespack}
                keyExtractor={(item, index) => item.uri + index.toString()}
                renderItem={({ item }) => (
                    <View style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
                    </View>
                )}
            />
     
        <Pressable
         
         onPress={handleAddhome} 
         
         style={{
           width: "85%",
           backgroundColor: "#539DF3",
           padding: 15,
           marginTop: 10,
           height:"10%",
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
           Register
         </Text>
       </Pressable>
      
       
       </ScrollView>
       </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddHome;

const styles = StyleSheet.create({ 
    

    container:{
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