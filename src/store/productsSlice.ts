import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts as requestProducts, type Product } from "../lib/api";

export type ProductsStatus = "idle" | "loading" | "succeeded" | "failed";

export type ProductsState = {
  items: Product[];
  status: ProductsStatus;
  error: string;
};

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { signal, rejectWithValue }) => {
  try {
    return await requestProducts(signal);
  } catch (reason) {
    return rejectWithValue(
      reason instanceof Error ? reason.message : "Unable to load products."
    );
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // Запрос отменён (например, размонтирование компонента) — это не ошибка загрузки.
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load products.";
      });
  },
});

export default productsSlice.reducer;
