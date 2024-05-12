import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartMenuItem = {
  id: number;
  title: string;
  price: number;
  note?: string | undefined;
  quantity: number;
  totalPrice?: number;
  image: string;
};

interface CartState {
  items: CartMenuItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartMenuItem>) {
      const stateItems = state.items;
      const newItem = action.payload;
      const existingItem = stateItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        newItem.totalPrice = newItem.price * newItem.quantity;
        stateItems.push(newItem);
      }

      state.totalAmount = state.items.reduce((accumulator, item) => {
        return item.totalPrice! + accumulator;
      }, 0);
    },

    removeItemFromCart(state, action: PayloadAction<CartMenuItem>) {
      const stateItems = state.items;
      const removeItem = stateItems.find(
        (item) => item.id === action.payload.id
      );
      if (!removeItem) return;

      if (removeItem.quantity !== 1) {
        removeItem.quantity--;
        removeItem.totalPrice = removeItem.totalPrice! - removeItem.price;
      } else {
        state.totalQuantity = state.totalQuantity - 1;
        state.items = stateItems.filter((item) => item.id !== removeItem.id);
      }

      state.totalAmount = state.totalAmount - removeItem.price;

      if (state.items.length === 0) {
        localStorage.removeItem("reduxState");
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice;
