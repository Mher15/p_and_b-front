import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStoreItem } from "../../app/types";

interface StoreState {
  rows: IStoreItem[];
}

const initialState: StoreState = {
  rows: [],
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
        finded.count = action.payload.count;

        return;
      }
      state.rows.push(action.payload);
    },
    clearStore(state) {
      state.rows = [];
    },
  },
});

export const { changeStoreItem, clearStore } = storeSlice.actions;
export default storeSlice.reducer;
