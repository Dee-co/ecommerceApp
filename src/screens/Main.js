import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { BG, THEME_COLOR } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import Profile from './tabs/Profile';
import GlobalStyles from '../component/GlobalStyles';
import Home from './tabs/Home';
import Menu from './tabs/Menu';
import Cart from './tabs/Cart';
import Order from './tabs/Order';

// ✅ Import Lucide icons
import {
  Home as HomeIcon,
  List,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'lucide-react-native';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();

  const tabs = [
    { label: 'Home', icon: HomeIcon, component: <Home /> },
    { label: 'Menu', icon: List, component: <Menu /> },
    { label: 'Orders', icon: ShoppingBag, component: <Order /> },
    { label: 'Cart', icon: ShoppingCart, component: <Cart /> },
    { label: 'Profile', icon: User, component: <Profile /> },
  ];

  const renderContent = () => {
    return tabs[selectedTab]?.component || <Home />;
  };

  return (
    <View style={[GlobalStyles.container, { flex: 1, position: 'relative' }]}>
      <View style={GlobalStyles.innerContainer}>
        <View>{renderContent()}</View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = selectedTab === index;

          return (
            <TouchableOpacity
              key={index}
              style={styles.bottomTab}
              onPress={() => setSelectedTab(index)}
            >
              <Icon size={28} color={isActive ? BG : '#4a4a48'} />
              <Text
                style={[styles.label, { color: isActive ? BG : '#4a4a48' }]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  bottomNav: {
    width: '100%',
    height: Platform.OS === 'ios' ? 60 : 50,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
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
