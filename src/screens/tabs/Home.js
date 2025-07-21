import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LocationHeader from '../../component/LocationHeader';
import Category from '../../component/Category';
import CustomInput from '../../component/CustomInput';
import { Search, MapPin } from 'lucide-react-native';
import Product from '../../component/Product';
import ProductsData from '../../config/ProductsData.json'
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
    <View style={styles.container}>
      <LocationHeader />
      <View style={styles.searchBox}>
        <CustomInput
          value={searchValue}
          onChangeText={txt => setSearchValue(txt)}
          placeholder={'search here'}
          height={40}
          isValid={true}
          lucideIcon={<Search size={24} color="#9e9e9e" />}
        />
      </View>
      <Category categories={categories} />
      <View>
        <Product products={ProductsData}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    searchBox:{
        marginBlock:10
    }
});
export default Home;
