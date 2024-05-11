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
      stateItems.map((item) => {
        state.totalAmount += item.totalPrice!;
      });
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice;
