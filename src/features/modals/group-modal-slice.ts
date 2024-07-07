import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGroup,
  ICreateEditModal,
  OpenCloseModalPayload,
} from "../../app/types";

const initialState: ICreateEditModal<IGroup> = {
  isOpen: false,
  form: "groupModalForm",
  errors: "",
  formValues: { id: 0, name: "", image: "" },
};

const modalsSlice = createSlice({
  name: "groupModal",
  initialState,
  reducers: {
    setIsGroupModalOpen(
      state,
      action: PayloadAction<OpenCloseModalPayload<IGroup>>
    ) {
      const { formValues, isOpen } = action.payload;
      state.isOpen = isOpen;
      state.formValues = formValues ? formValues : initialState.formValues;
    },
  },
});

export const { setIsGroupModalOpen } = modalsSlice.actions;
export default modalsSlice.reducer;
