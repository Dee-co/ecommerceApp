import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import LocationHeader from '../../component/LocationHeader';
import Category from '../../component/Category';
import CustomInput from '../../component/CustomInput';
import { Search } from 'lucide-react-native';
import Product from '../../component/Product';
import ProductsData from '../../config/ProductsData.json';

const { height } = Dimensions.get('window');

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  const categories = [
    'All',
    'Pizza',
    'Burger',
    'Drinks',
    'Desserts',
    'Pasta',
    'Salad',
    'Sandwich',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      
      {/* Gradient Background on Top */}
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.gradientBg}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LocationHeader />

        <View style={styles.searchBox}>
          <CustomInput
            value={searchValue}
            onChangeText={txt => setSearchValue(txt)}
            placeholder={'Search for products'}
            height={40}
            isValid={true}
            lucideIcon={<Search size={24} color="#9e9e9e" />}
          />
        </View>

        <Category categories={categories} />

        <Product products={ProductsData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFD700',
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.38, // Gradient only for top part
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  searchBox: {
    marginVertical: 10,
  },
});
