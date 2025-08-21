import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Home as HomeIcon,
  List,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'lucide-react-native';

import Profile from './tabs/Profile';
import Home from './tabs/Home';
import Menu from './tabs/Menu';
import Cart from './tabs/Cart';
import Order from './tabs/Order';
import { BG } from '../utils/Colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const iosStatusBarHeight = Platform.OS === 'ios' ? 44 : 0;

const Main = () => {
  return (
    <>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFD700" />

      {/* iOS placeholder */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBarPlaceholder} />}

      {/* Yellow top background */}
      <View style={styles.halfBg} />

      <SafeAreaView style={styles.mainArea} edges={['left', 'right', 'bottom']}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: 70,
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              paddingBottom: Platform.OS === 'ios' ? 10 : 10,
            },
            tabBarIcon: ({ color, size, focused }) => {
              let IconComponent;
              if (route.name === 'Home') IconComponent = HomeIcon;
              else if (route.name === 'Menu') IconComponent = List;
              else if (route.name === 'Orders') IconComponent = ShoppingBag;
              else if (route.name === 'Cart') IconComponent = ShoppingCart;
              else if (route.name === 'Profile') IconComponent = User;

              return <IconComponent size={28} color={focused ? BG : '#4a4a48'} />;
            },
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.label, { color: focused ? BG : '#4a4a48' }]}>
                {route.name}
              </Text>
            ),
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Menu" component={Menu} />
          <Tab.Screen name="Orders" component={Order} />
          <Tab.Screen name="Cart" component={Cart} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  iosStatusBarPlaceholder: {
    height: iosStatusBarHeight,
    backgroundColor: '#FFA41B',
  },
  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT / 4,
    backgroundColor: '#FFA41B',
    zIndex: -1,
  },
  mainArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
