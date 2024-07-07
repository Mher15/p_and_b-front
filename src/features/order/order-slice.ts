import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeliveryOffer, IOrder, IOrderProduct } from "../../app/types";

interface OrderSliceState {
  deliveryCountry: number;
  deliveryCity: number;
  deliveryAddress: string;
  deliveryMethod: string;
  deliveryPrice: number;
  lastName: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  comment: string;
  destinationStationId?: string;
  destinationOffer?: IDeliveryOffer;
  products: IOrderProduct[];
}

const initialState: OrderSliceState = {
  deliveryCountry: 0,
  deliveryCity: 0,
  deliveryPrice: 0,
  deliveryAddress: "",
  deliveryMethod: "",
  lastName: "",
  name: "",
  patronymic: "",
  phone: "",
  email: "",
  comment: "",
  products: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setNewOrder(state, action: PayloadAction<IOrder>) {
      state.deliveryCountry = action.payload.deliveryCountry;
      state.deliveryCity = action.payload.deliveryCity;
      state.deliveryPrice = action.payload.deliveryPrice;
      state.deliveryMethod = action.payload.deliveryMethod;
      state.lastName = action.payload.lastName;
      state.name = action.payload.name;
      state.patronymic = action.payload.patronymic;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.comment = action.payload.comment;
      state.products = action.payload.products;
    },
    setDeliveryPrice(state, action: PayloadAction<number>) {
      state.deliveryPrice = action.payload;
    },
  },
});

export const { setNewOrder, setDeliveryPrice } = orderSlice.actions;
export default orderSlice.reducer;
