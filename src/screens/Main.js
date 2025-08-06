import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Profile from './tabs/Profile';
import Home from './tabs/Home';
import Menu from './tabs/Menu';
import Cart from './tabs/Cart';
import Order from './tabs/Order';
import { BG } from '../utils/Colors';
import {
  Home as HomeIcon,
  List,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const tabs = [
  { label: 'Home', icon: HomeIcon, route: 'HomeTab', component: <Home /> },
  { label: 'Menu', icon: List, route: 'MenuTab', component: <Menu /> },
  { label: 'Orders', icon: ShoppingBag, route: 'OrderTab', component: <Order /> },
  { label: 'Cart', icon: ShoppingCart, route: 'CartTab', component: <Cart /> },
  { label: 'Profile', icon: User, route: 'ProfileTab', component: <Profile /> },
];

const Main = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState('HomeTab');

  useEffect(() => {
    if (route.params?.screen) {
      const matchedTab = tabs.find(tab => tab.route === route.params.screen);
      if (matchedTab) {
        setCurrentRoute(route.params.screen);
      }
    }
  }, [route.params?.screen]);

  const renderContent = () => {
    const tab = tabs.find(tab => tab.route === currentRoute);
    return tab?.component || <Home />;
  };

  return (
    <>
      {/* ✅ Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFD700" translucent={false} />

      {/* ✅ iOS extra status bar background */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBarPlaceholder} />}

      {/* ✅ Yellow background only top half */}
      <View style={styles.halfBg} />

      {/* ✅ Main Content */}
      <SafeAreaView style={styles.mainArea} edges={['left', 'right', 'bottom']}>
        <View style={{ paddingTop: Platform.OS === 'android' ? insets.top : 0, flex: 1 }}>
          {renderContent()}
        </View>

        {/* ✅ Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = tab.route === currentRoute;
            return (
              <TouchableOpacity
                key={index}
                style={styles.bottomTab}
                onPress={() => setCurrentRoute(tab.route)}
              >
                <Icon size={28} color={isActive ? BG : '#4a4a48'} />
                <Text style={[styles.label, { color: isActive ? BG : '#4a4a48' }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  iosStatusBarPlaceholder: {
    height: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: '#FFD700',
  },
  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT / 3,
    backgroundColor: '#FFD700',
    zIndex: -1,
  },
  mainArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    width: '100%',
    height: Platform.OS === 'ios' ? 70 : 70,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    paddingBottom: Platform.OS === 'ios' ? 10 : 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomTab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
