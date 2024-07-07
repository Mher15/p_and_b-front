import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateEditModal,
  OpenCloseModalPayload,
  IDocument,
} from "../../app/types";

const initialState: ICreateEditModal<IDocument> = {
  isOpen: false,
  form: "documentModalForm",
  errors: "",
  formValues: { id: 0, name: "", file: "" },
};

const modalsSlice = createSlice({
  name: "documentModal",
  initialState,
  reducers: {
    setIsDocumentModalOpen(
      state,
      action: PayloadAction<OpenCloseModalPayload<IDocument>>
    ) {
      const { formValues, isOpen } = action.payload;
      state.isOpen = isOpen;
      state.formValues = formValues ? formValues : initialState.formValues;
    },
  },
});

export const { setIsDocumentModalOpen } = modalsSlice.actions;
export default modalsSlice.reducer;
