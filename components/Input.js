import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import COLORS from '../const/colors';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom:10}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
      <Feather
          name={iconName}
          style={{color: COLORS.darkBlue, fontSize: 22, marginRight: 10}}
        />

        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
        />
       
        {password && (
        <Feather
        onPress={() => setHidePassword(!hidePassword)}
        name={hidePassword ? "eye-off" : "eye"}
        style={{color: COLORS.darkBlue, fontSize: 22}}
      />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 87, color: COLORS.red, fontSize: 12,position:"absolute"}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: "1%",
    fontSize: 14,
    color: COLORS.grey,
    fontFamily:"Poppins",
    
    
  },
  inputContainer: {
    height: 55,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 0,
    
    borderColor: "#F0F0F0",
    borderWidth: 1,
    shadowColor: "#707070",
    marginBottom:5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderRadius:4,
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    width:305,
    
  },
});

export default Input;