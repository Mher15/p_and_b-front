import { getPriceWithMarkup, mapToOrderProducts } from "../../utils";
import { userRoles } from "../constants";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const basketRowsSelector = (state: RootState) => state.basket.rows;
const userSelector = (state: RootState) => state.profile.user;

export const totalWeightSelector = createSelector(
  [basketRowsSelector],
  (basketRows) =>
    basketRows.reduce((acc, basketRow) => {
      const { product, count } = basketRow;
      acc += product.weight * count;

      return acc;
    }, 0)
);

export const totalPriceWithoutDiliverySelector = createSelector(
  [basketRowsSelector, userSelector],
  (basketRows, user) =>
    basketRows.reduce((acc, basketRow) => {
      const { product, count } = basketRow;
      const userRole = user?.role || userRoles.GUEST;
      const resultPrice = getPriceWithMarkup(product.price, userRole);
      acc += resultPrice * count;

      return acc;
    }, 0)
);

export const totalVolumePriceSelector = createSelector(
  [basketRowsSelector],
  (basketRows) =>
    basketRows.reduce((acc, basketRow) => {
      const { product, count } = basketRow;
      acc += product.price * count;

      return acc;
    }, 0)
);

export const orderProductsSelector = createSelector(
  [basketRowsSelector],
  (basketRows) => mapToOrderProducts(basketRows)
);
