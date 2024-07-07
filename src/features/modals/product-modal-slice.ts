import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateEditModal, ITableProductItem } from "../../app/types";

interface OpenCloseEditModalPayload {
  isOpen: boolean;
  formValues?: ITableProductItem;
}

const initialState: ICreateEditModal<ITableProductItem> = {
  isOpen: false,
  form: "productModalForm",
  errors: "",
  formValues: {
    id: 0,
    groups: [],
    brand: { id: 0, name: "", image: "" },
    name: "",
    description: "",
    shortDescription: "",
    methodOfAdministration: "",
    price: 0,
    vopPrice: 0,
    images: [],
    sku: 0,
    utility: "",
    compound: "",
    documents: [],
    discount: 0,
    weight: 0,
    barCode: 0,
    key: "",
  },
};

const productModalsSlice = createSlice({
  name: "productModal",
  initialState,
  reducers: {
    setIsProductModalOpen(
      state,
      action: PayloadAction<OpenCloseEditModalPayload>
    ) {
      const { formValues, isOpen } = action.payload;
      state.isOpen = isOpen;

      state.formValues = formValues ? formValues : initialState.formValues;
    },
  },
});

export const { setIsProductModalOpen } = productModalsSlice.actions;
export default productModalsSlice.reducer;
