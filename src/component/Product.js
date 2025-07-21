import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/CartSlice';

const Product = ({ products = [] }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (variantId) => {
  return Object.values(cartItems).some(item => item.product.variants[0].id === variantId);
};


  const handleAddOrRemove = (item, variant) => {
    if (isInCart(variant.id)) {
      dispatch(removeFromCart({ product: item, variant }));
    } else {
      dispatch(addToCart({ product: item, variant, qty: 1 }));
    }
  };

  const renderItem = ({ item }) => {
    const variant = item.variants[0];
    const added = isInCart(variant.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: variant.img }} style={styles.image} />
        <Text style={styles.name} numberOfLines={2}>
          {variant.vn}
        </Text>
        <Text style={styles.unit}>
          {variant.unitValue} {variant.unit.label}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{variant.productPrice}</Text>
          <Text style={styles.marketPrice}>₹{variant.marketPrice}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, added && styles.addedBtn]}
          onPress={() => handleAddOrRemove(item, variant)}
        >
          <Text style={[styles.addText, added && styles.addedText]}>
            {added ? 'Remove' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.productId}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 1 }}
    />
  );
};

export default Product;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 6,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    minHeight: 35,
  },
  unit: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  marketPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addBtn: {
    marginTop: 6,
    borderColor: '#f8b231',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 4,
  },
  addText: {
    color: '#f8b231',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  addedBtn: {
    backgroundColor: '#f8b231',
  },
  addedText: {
    color: '#fff',
  },
});
