
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
  import * as SplashScreen from 'expo-splash-screen';
  import style from '../style/style';
  import ScrollPicker from "react-native-wheel-scrollview-picker";

  import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import MultiSelect from 'react-native-multiple-select';
import { Ionicons } from '@expo/vector-icons';

const AddHome = () => {
  const dataSource = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  const ref = React.useRef();
  const [index, setIndex] = React.useState(0);
  const [indexbedroom, setIndexbedroom] = React.useState(0);

  const onValueChange = (data, selectedIndex) => {
    setIndex(selectedIndex);
  };
  const onValueChangebedroom = (data, selectedIndex) => {
    setIndexbedroom(selectedIndex);
  };
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
  var [regiontags, setRegiontags] = useState([]);

  class Multiselect extends Component {
    state = {
      tags : []
    };
    
    onSelectedItemsChange = tags => {
      this.setState({ tags });
      console.log(tags)
    };


    render() {

      const { tags } = this.state;
      proptags = tags
      return (
        <View style={{ flex: 0 ,width:"90%"}}>
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
              setProptags(text)}
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
  class Singleselect extends Component {
    state = {
      tags : []
    };
    
    onSelectedItemsChange = tags => {
      this.setState({ tags });
      console.log(tags)
    };


    render() {

      const { tags } = this.state;
      regiontags = tags
      return (
        <View style={{ flex: 0 ,width:"90%", marginTop:25,marginBottom:25}}>
          <MultiSelect
            hideTags
            single
            items={regions}
            uniqueKey="region"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={tags}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> 
              setRegiontags(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="region"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <View>
  
  </View>
        </View>
      );
    }
  }

 


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
 
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);









  
  let [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf')
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
    const [youtube, setYoutube] = useState("");
    const [regions, setRegions] = useState("");

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
        youtube:'',
       
      });

      const fetchRegions = async () => {
        try {
          const response = await axios.get("http://10.0.0.10:27017/get-regions");
          setRegions(response.data);

          console.log(response.data , "amirpellman")
        } catch (error) {
          console.log("error fetching regions", error);
        }
      };
    
      useEffect(() => {
        fetchRegions();
    
      }, []);
      console.log(regions,"asdsd")

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
              regiontags:regiontags,
              youtube:youtube,
              imagespack:imagespack
            };
            {
            axios
              .post("http://10.0.0.10:27017/addhome", home)
              .then((response) => {
                console.log(response);
              
      
                setImages("");
                setDescription("");
                setPrice("");
                setTitle("");
                setName("");
                setYoutube("");
                setBedrooms("");
                setHomesquremeter("");
                setPropetysquremeter("");
                setSerialnum("");
                setRegion("");
                setBaths("");
                setProptags("");
                setRegiontags(regiontags);
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
          console.log(region , "region selected")
          console.log(regiontags , "Asdasd")
          console.log(baths , "baths")

  return (

    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>


    <SafeAreaView

      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
<View style={{marginBottom:100 }}>

<View style={{height:"5%",width:"100%",alignItems:"center"}}> 


   </View>
 
   <Modal
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}

        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" ,height:"100%", display:"flex" , alignItems:"center" }}>



          <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
                  setModalVisible(!modalVisible);
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            <Multiselect/>
   <Singleselect/>
   <Text>bedrooms</Text>
   <View style={{height:150, width:"100%"}}>
   <ScrollPicker
      ref={ref}
      dataSource={dataSource}
      selectedIndex={indexbedroom}
      wrapperHeight={150}
      wrapperBackground="#FFFFFF"
      itemHeight={40}
      highlightColor="#d8d8d8"
      highlightBorderWidth={1}
      onValueChange={(data, selectedIndex) => {
        setBedrooms(data);
                    handleOnchange(data,'bedrooms')
        console.log(selectedIndex, "select")
        console.log(data, "data")
//data is the current num
      }}
    />
    </View>

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
   
        
   <View style={{display:"flex" ,position:"absolute", justifyContent:"flex-end", alignItems:"flex-end", height:"95%", width:"100%"}}>  
           
                <Pressable 
          
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
            onPress={() =>
              {
                setModalVisible2(!modalVisible2);
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
              Continue
            </Text>
            
                  </Pressable>
            </View>
     


            </View>




          </View>
   
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible2}
        statusBarTranslucent={true}

        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" ,height:"100%", display:"flex" , alignItems:"center" }}>

            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible2(!modalVisible2)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>

            <View style={{ display:"flex" , justifyContent:"center",alignItems:"center",height:"75%"}}>  
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
</View>



<View style={{display:"flex" ,position:"absolute", justifyContent:"flex-end", alignItems:"flex-end", height:"95%", width:"100%"}}>  

            <Pressable 
          
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
            onPress={() =>
              {
                setModalVisible3(!modalVisible3);
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
              Continue
            </Text>
            
                  </Pressable>
                  </View>
            
            </View>




          </View>
   
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}

        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" , display:"flex" , alignItems:"flex-start",height:"100%" }}>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible3(!modalVisible3)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
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
                 <Image source={{ uri: item }} style={{ width: 200, height: 200 , marginLeft:10 }} />
             </View>
         )}
     />





















  
 
 <View style={{display:"flex" ,position:"absolute", justifyContent:"flex-end", alignItems:"flex-end", height:"95%", width:"100%"}}>  

<Pressable 

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
onPress={() =>
  {
    setModalVisible4(!modalVisible4);
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
  Continue
</Text>

      </Pressable>
      </View>
            </View>




          </View>
   
        </View>
      </Modal>
 

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible4}
        statusBarTranslucent={true}

        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" , display:"flex" , alignItems:"flex-start" }}>
         
    
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
               
               <Text>Baths</Text>

              <View style={{height:150, width:"100%"}}>
   <ScrollPicker
      ref={ref}
      dataSource={dataSource}
      selectedIndex={index}
      wrapperHeight={150}
      wrapperBackground="#FFFFFF"
      itemHeight={40}
      highlightColor="#d8d8d8"
      highlightBorderWidth={1}
      onValueChange={(data, selectedIndex) => {
        setBaths(data);
                    handleOnchange(data,'baths')
        console.log(selectedIndex, "select")
        console.log(data, "data")
//data is the current num
      }}
    />
    </View>

  
          <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible4(!modalVisible4)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
                  setModalVisible5(!modalVisible5)

                }
               }>
                
               <Text>next</Text>
            </Pressable>
            </View>




          </View>
   
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible5}
        statusBarTranslucent={true}

        onRequestClose={() => {
          setModalVisible5(!modalVisible5);
         
        }}
        >



        <View  style={style.centeredView}>
          
          <View style={style.modalView}>
            <View style={{width:"100%" , display:"flex" , alignItems:"flex-start" }}>
         
    
            <Input style={{fontFamily:"Poppins",width:"80%"}}
                value={youtube}
                onChangeText ={
                  (text) => {
                    setYoutube(text);
                    handleOnchange(text,'youtube')
                  }}
                
                  label="youtube"
                placeholder="hXfJuVMWnxA"
              />

    
  
          <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() =>
                {
               setModalVisible5(!modalVisible5)
                }
               }>
                
                <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress=
                {handleAddhome}
               >
                
               <Text>next</Text>
            </Pressable>
            </View>




          </View>
   
        </View>
      </Modal>




      <View style={style.buttonContainer}>
   
   <Pressable style={{
     flexDirection: "row", marginRight: 0, flex: 1,
     justifyContent: 'center',
     alignItems: 'center',

           }}
           onPress={() => setModalVisible(!modalVisible)}

   >
   
   
       
       <Text style={{ marginLeft: 20, color: "#8C8C8C" }}>price / bedrooms / baths</Text>

   </Pressable>
 </View>




   

   
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
      
       
       </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddHome

const styles = StyleSheet.create({ 
    

    container:{
        height:100,
        width:100,
        padding:0,
        justifyContent:"center",
        alignSelf:"center",
        alignItems:"center",
        margin:25
      
    },
    uploadBtnContainer:{
        
        position:'absolute',
        right:20,
        bottom:-10,
        width:'60%',
        height:'25%',
        borderColor:"#000000"
        ,borderWidth:0.5,
     
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