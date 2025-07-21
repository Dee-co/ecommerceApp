import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SECONDARY } from '../utils/Colors';

const Category = ({ categories = [] }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View >
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  categoryItem: {
    backgroundColor: SECONDARY,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight:500,
    textTransform: 'capitalize',
  },
});
