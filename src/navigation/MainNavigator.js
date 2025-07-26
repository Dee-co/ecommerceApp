import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Otp from '../screens/Otp';
import Location from '../screens/Location';
import OrderDetails from '../screens/OrderDetail';
const Stack = createStackNavigator();
const MainNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false }}
            component={Splash}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={Main}
          />
          <Stack.Screen
            name="Otp"
            options={{ headerShown: false,}}
            component={Otp}
          />
          <Stack.Screen
            name="Location"
            options={{ headerShown: false,}}
            component={Location}
          />
          <Stack.Screen
            name="OrderDetails"
            options={{ headerShown: false,}}
            component={OrderDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default MainNavigator;
