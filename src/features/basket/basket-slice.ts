import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketRow } from "../../app/types";

interface BasketState {
  rows: BasketRow[];
}

const initialState: BasketState = {
  rows: [],
};

const basketSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<BasketRow>) {
      const count = action.payload.count || 1;
      const product = action.payload.product;
      state.rows.push({ product, count });
    },
    deleteFromBasket(state, action: PayloadAction<BasketRow>) {
      state.rows = state.rows.filter(
        (row) => row.product.id !== action.payload.product.id
      );
    },
    countPlus(state, action: PayloadAction<BasketRow>) {
      const curentRow = state.rows.find(
        (row) => row.product.id === action.payload.product.id
      );

      if (!curentRow) return;
      curentRow.count = (curentRow.count || 0) + 1;
    },
    countMinus(state, action: PayloadAction<BasketRow>) {
      const curentRow = state.rows.find(
        (row) => row.product.id === action.payload.product.id
      );

      if (!curentRow || !curentRow.count) return;
      curentRow.count =
        curentRow.count > 0 ? curentRow.count - 1 : curentRow.count;
    },
    clearBasket(state) {
      state.rows = [];
    },
  },
});

export const {
  addToBasket,
  deleteFromBasket,
  countPlus,
  countMinus,
  clearBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
