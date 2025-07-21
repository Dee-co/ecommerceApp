import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: {}, // { productId: { product, quantity } }
};

const persistCart = async (items) => {
  await AsyncStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state, action) {
      state.items = action.payload || {};
    },
    addToCart(state, action) {
      const { product } = action.payload;
      const id = product.productId;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { product, quantity: 1 };
      }
      persistCart(state.items);
    },
    removeFromCart(state, action) {
      const { productId } = action.payload;

      if (state.items[productId]) {
        state.items[productId].quantity -= 1;

        if (state.items[productId].quantity <= 0) {
          delete state.items[productId];
        }
      }
      persistCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
