import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStoreItem } from "../../app/types";

interface StoreState {
  rows: IStoreItem[];
  count: number;
}

const initialState: StoreState = {
  rows: [],
  count: 0,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    changeStoreItem(state, action: PayloadAction<IStoreItem>) {
      const finded = state.rows.find(
        (row: IStoreItem) => row.product.id === action.payload.product.id
      );
      if (finded) {
        console.log("aaaaaaaa");

        finded.count = action.payload.count;

        return;
      }
      state.rows.push(action.payload);
    },

    changeCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    clearStore(state) {
      state.rows = [];
    },
  },
});

export const { changeStoreItem, clearStore,changeCount } = storeSlice.actions;
export default storeSlice.reducer;
