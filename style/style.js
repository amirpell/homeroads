

import { StyleSheet } from "react-native";

export default StyleSheet.create({

  photoitem:{
    fontSize:25,
    backgroundColor:"#000000",
    color:"#000000",
    margin:5,
    padding:5,
    height:120,
    width:120,
    textAlign:'center',
    textAlignVertical:'center',



},

postgallery:{
  flex:1


},


    card: {
      margin:-2,borderColor:"#FFFFFF",backgroundColor:"#FFFFFF",borderWidth:3,borderRadius:20,width:"100%",marginBottom:5,minHeight:"95%",

      shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 0,
    
    borderColor: "#F0F0F0",
    borderWidth: 1,
    shadowColor: "#707070",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    
	},
    pagecontainer: {
		justifyContent: 'center',
        alignItems:'center',
        
        backgroundColor:'#F9F9F9',
        paddingBottom:45,
        flex: 1,
	},
 
    image: {
		width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems:'center',
	},

	



   /* Just for you on home page */

	HeadFont: {
		marginHorizontal:20,fontSize:17,fontWeight:"500",textAlign:'left'
	},
       /* search bar */

    buttonContainer: {
      margin: 15, borderColor:"#FFFFFF",backgroundColor:"#ffffff",
      borderWidth:3,borderRadius:60,width:335,height:55,
      shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 0,
    borderColor: "#000000",
    borderWidth: 0,
    shadowColor: "#707070",
    shadowOffset: {
      width: 3,
      height: 3,
    },
      },














      centeredView: {
        
        alignItems: "flex-end",
        justifyContent:"flex-end",

      },
      modalView: {
        marginTop: 25,
        backgroundColor: 'white',
        padding: 25,
        height:'100%',
        width:'100%',
        alignItems: 'center',
        
      
      },
      button: {
         marginTop:5,
        borderRadius: 20,
       marginLeft:0,
       marginBottom:15,
        padding: 5,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#ffffff',
        width:"100%"
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:"Poppins"
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily:"Poppins"      },




      
});