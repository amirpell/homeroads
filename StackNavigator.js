import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AddHome from './screens/AddHome'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';

const StackNavigator = () => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
      return (
        <Tab.Navigator screenOptions={{tabBarStyle: {position: 'absolute', height: 55}}}  headerMode = {'none'}>
  
  
          <Tab.Screen name="AddHome" component={AddHome} options={{
            tabBarLabel: "AddHome", headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (
              <Feather name="home" size={24} color="#539DF3" />  
  
            ) : (
              <Feather name="home" size={24} color="#484C52" />
  
            )
          }}
          />
  
          
  <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
            tabBarLabel: ".", headerShown: false,
            tabBarIcon: ({ focused }) => focused ? (
              <Feather name="home" size={24} color="#539DF3" />  
  
            ) : (
              <Feather name="home" size={24} color="#484C52" />
  
            )
          }}
          />
 
                  
            
  
        </Tab.Navigator>
      )
    }
  return (
    <NavigationContainer>
      <Stack.Navigator>
  
             <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />

    
   

      

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})