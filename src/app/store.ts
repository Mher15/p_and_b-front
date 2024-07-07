import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profile-slice";
import groupModalReducer from "../features/modals/group-modal-slice";
import documentModalReducer from "../features/modals/document-modal-slice";
import brandModalReducer from "../features/modals/brand-modal-slice";
import productModalReducer from "../features/modals/product-modal-slice";
import authModalReducer from "../features/modals/auth-modal-slice";
import basketReducer from "../features/basket/basket-slice";
import { groupsApiSlice } from "../features/api/groups-api-slice";
import { brandsApiSlice } from "../features/api/brand-api-slice";
import { productsApiSlice } from "../features/api/products-api-slice";
import { companyInfoApiSlice } from "../features/api/company-info-api-slice";
import { authApiSlice } from "../features/api/auth-api-slice";
import { storeApiSlice } from "../features/api/store-api-slice";
import { imagesApiSlice } from "../features/api/images-api-slice";
import uploaderReducer from "../features/uploader/uploader-slice";
import { userApiSlice } from "../features/api/user-api-slice";
import { favoriteProductsApiSlice } from "../features/api/favorite-products-api-slice";
import registrationReducer from "../features/registration/registration-slice";
import storeReducer from "../features/store/store-slice";
import orderReducer from "../features/order/order-slice";
import { referralLinksApiSlice } from "../features/api/referral-links-api-slice";
import { addressApiSlice } from "../features/api/address-api-slice";
import { deliveryApiSlice } from "../features/api/delivery-api-slice";
import { documentsApiSlice } from "../features/api/documents-api-slice";
import { marketingApiSlice } from "../features/api/marketing-api-slice";
import { orderApiSlice } from "../features/api/order-api-slice";
import { personalAccountApiSlice } from "../features/api/personal-account-api-slice";

const modalsReducer = combineReducers({
  groupModal: groupModalReducer,
  documentModal: documentModalReducer,
  brandModal: brandModalReducer,
  productModal: productModalReducer,
  authModal: authModalReducer,
});

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    modals: modalsReducer,
    basket: basketReducer,
    uploader: uploaderReducer,
    registration: registrationReducer,
    store: storeReducer,
    order: orderReducer,
    [groupsApiSlice.reducerPath]: groupsApiSlice.reducer,
    [brandsApiSlice.reducerPath]: brandsApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [companyInfoApiSlice.reducerPath]: companyInfoApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [storeApiSlice.reducerPath]: storeApiSlice.reducer,
    [imagesApiSlice.reducerPath]: imagesApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [favoriteProductsApiSlice.reducerPath]: favoriteProductsApiSlice.reducer,
    [referralLinksApiSlice.reducerPath]: referralLinksApiSlice.reducer,
    [addressApiSlice.reducerPath]: addressApiSlice.reducer,
    [documentsApiSlice.reducerPath]: documentsApiSlice.reducer,
    [deliveryApiSlice.reducerPath]: deliveryApiSlice.reducer,
    [marketingApiSlice.reducerPath]: marketingApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [personalAccountApiSlice.reducerPath]: personalAccountApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      groupsApiSlice.middleware,
      brandsApiSlice.middleware,
      productsApiSlice.middleware,
      companyInfoApiSlice.middleware,
      authApiSlice.middleware,
      imagesApiSlice.middleware,
      storeApiSlice.middleware,
      userApiSlice.middleware,
      favoriteProductsApiSlice.middleware,
      referralLinksApiSlice.middleware,
      addressApiSlice.middleware,
      documentsApiSlice.middleware,
      deliveryApiSlice.middleware,
      marketingApiSlice.middleware,
      orderApiSlice.middleware,
      personalAccountApiSlice.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
