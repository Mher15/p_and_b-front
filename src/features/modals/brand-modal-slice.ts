import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateEditModal,
  IBrand,
  OpenCloseModalPayload,
} from "../../app/types";

const initialState: ICreateEditModal<IBrand> = {
  isOpen: false,
  form: "brandModalForm",
  errors: "",
  formValues: { id: 0, name: "", image: "" },
};

const brandModalsSlice = createSlice({
  name: "brandModal",
  initialState,
  reducers: {
    setIsBrandModalOpen(
      state,
      action: PayloadAction<OpenCloseModalPayload<IBrand>>
    ) {
      const { formValues, isOpen } = action.payload;
      state.isOpen = isOpen;
      state.formValues = formValues ? formValues : initialState.formValues;
    },
  },
});

export const { setIsBrandModalOpen } = brandModalsSlice.actions;

export default brandModalsSlice.reducer;
