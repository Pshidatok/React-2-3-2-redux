import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../lib/api";

export type CartItem = Product & { quantity: number };

export type CartState = {
  /** Количество, выбранное в карточке товара до добавления в корзину. */
  quantities: Record<number, number>;
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  quantities: {},
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeProductQuantity(
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) {
      state.quantities[action.payload.id] = Math.max(1, action.payload.value);
    },
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const quantity = state.quantities[product.id] ?? 1;
      const existing = state.items[product.id];
      state.items[product.id] = {
        ...product,
        quantity: (existing?.quantity ?? 0) + quantity,
      };
    },
    changeCartQuantity(
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) {
      const item = state.items[action.payload.id];
      if (item) item.quantity = action.payload.value;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
  },
});

export const {
  changeProductQuantity,
  addToCart,
  changeCartQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
