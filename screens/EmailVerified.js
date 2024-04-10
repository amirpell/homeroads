import { StyleSheet, Text, View,Image, Button, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const EmailVerified = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex:1,alignSelf:"center",marginVertical:"40%"}}>
      <View style={{alignSelf:"center"}}>
<Image
    style={{alignSelf:"center"}}
    source={require("../iconpics/Frame12.png")}/>
<Text style={{fontSize:30, fontWeight:"bold",alignSelf:"center"}}>
Verification successful</Text>
<View style={{marginTop:"2%"}}>

</View>
</View>
<View style={{marginTop:"8%"}}>
<Pressable
              onPress={() => navigation.navigate("login")}
            style={{
              width: "100%",
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
              Proceed
            </Text>
            
          </Pressable>
</View>

    </View>
    
  )
}

export default EmailVerified

const styles = StyleSheet.create({})