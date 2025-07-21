import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Splash = () => {
    const authData = useSelector(state => state.auth)
    const navigation = useNavigation();
    useEffect(()=>{
        console.log("getting redux data", authData)
        setTimeout(()=>{
            if(authData.data === null){
            navigation.replace('Login')
            }else{
            navigation.replace('Main')

            }
        },3000)
    },[])
  return (
    <View style={styles.container}>
     <Image source={require('../images/cafeLogo.jpg')} style={styles.logo}/>
    </View>
  )
}

export default Splash;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:'40%',
        height:'30%',
        resizeMode:'contain'
    }
})