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
      {/* Gradient Background */}
      <LinearGradient
        colors={['#FFA41B','#FFB72B']}
        style={styles.gradientBg}
      />

      {/* Top Non-scrollable Section */}
      <View style={styles.headerSection}>
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

        {/* Fixed Category Bar */}
        <View style={styles.categoryWrapper}>
          <Category categories={categories} />
        </View>
      </View>

      {/* Scrollable Products Section */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Product products={ProductsData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    height: height / 5,
    zIndex: -1,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  searchBox: {
    marginVertical: 10,
  },
  categoryWrapper: {
    paddingVertical: 8,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
