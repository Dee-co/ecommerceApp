import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';

const CustomInput = ({
  mt,
  placeholder,
  onChangeText,
  isValid,
  keyboardType,
  icon,
  isSecure,
  value,
  maxLength,
  height,
  lucideIcon,
  style,
  onFocus
}) => {
  
  return (
    <View
      style={[{
        width: '100%',
        height: height || 50,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor:isValid?'#9e9e9e':'red',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      },{...style}]}>
      {icon && (
        <Image
          source={icon}
          style={{width: 24, height: 24, tintColor: '#9e9e9e'}}
        />
      )}
      {lucideIcon && lucideIcon}
      <TextInput
        style={{marginLeft: 10,width:'100%',color:'#000',fontSize: 16}}
        placeholder={placeholder}
        value={value}
        placeholderTextColor='#9e9e9e'
        secureTextEntry={isSecure?true:false}
        maxLength={maxLength ?? 80}
        keyboardType={keyboardType ?? 'default'}
        onChangeText={txt => {
          onChangeText(txt);
        }}
        onFocus={onFocus}
      />
    </View>
  );
};

export default CustomInput;