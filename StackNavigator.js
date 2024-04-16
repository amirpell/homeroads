import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AddHome from './screens/AddHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeProfile from './screens/HomeProfile';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import EmailVerfication from './screens/EmailVerfication';
import EmailVerified from './screens/EmailVerified';
import UserEmailToReset from './screens/UserEmailToReset';
import EnterResetToken from './screens/EnterResetToken';
import NewPassword from './screens/NewPassword';


const StackNavigator = ({ navigation }) => {

    const Stack = createNativeStackNavigator();
   // const Tab = createBottomTabNavigator();
    const Admin = createBottomTabNavigator();


    
    function AdminTabs() {
      
      return (
        <Admin.Navigator screenOptions={ {tabBarStyle: {position: 'absolute', height: 55}}}  headerMode = {'none'}>
 
          <Admin.Screen   name="AddHome" component={AddHome} options={{
            tabBarLabel: "AddHome", headerShown: false,
           
            tabBarIcon: ({ focused }) => focused ? (
              <Feather name="home" size={24} color="#539DF3" />  
  
            ) : (
              <Feather name="home" size={24} color="#484C52" />
  
            )
          }}
          />
       <Admin.Screen   name="HomeProfile" component={HomeProfile} options={{
            tabBarLabel: "HomeProfile", headerShown: false,
           
            tabBarIcon: ({ focused }) => focused ? (
              <Feather name="home" size={24} color="#539DF3" />  
  
            ) : (
              <Feather name="home" size={24} color="#484C52" />
  
            )
          }}
          />
  <Admin.Screen name="HomeScreen" component={HomeScreen} options={{
            tabBarLabel: "asd", headerShown: false,
          
            tabBarIcon: ({ focused }) => focused ? (
              <Feather name="home" size={24} color="#539DF3" />  
  
            ) : (
              <Feather name="home" size={24} color="#484C52" />
  
            )
          }}
          />
  
                  
            
  
        </Admin.Navigator>
      )
    }


 
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}
      
      
      />

      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminTabs} options={{ headerShown: false }} />
      
        <Stack.Screen name="EmailVerfication" component={EmailVerfication} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerified" component={EmailVerified} options={{ headerShown: false }} />
        <Stack.Screen name="UserEmailToReset" component={UserEmailToReset} options={{ headerShown: false }} />
        <Stack.Screen name="EnterResetToken" component={EnterResetToken} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />

   

      

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})