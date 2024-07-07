import { UploadFile } from "antd";
import { appRoutes, deliveryMethods, userRoles } from "./app/constants";
import { translate } from "./app/translation";
import { BasketRow, IGroup, IProduct } from "./app/types";
import { flatten, uniq } from "lodash";

export const getProductsTranslate = (count: number, locale: string) => {
  const ending100 = count % 100;
  const ending10 = count % 10;

  if (ending100 > 10 && ending100 < 15) {
    return `${translate("productGroups.product", locale)}${translate(
      "productGroups.product.ending.other",
      locale
    )}`;
  }
  if (ending10 === 1) {
    return `${translate("productGroups.product", locale)}`;
  }
  if (ending10 > 1 && ending10 < 5) {
    return `${translate("productGroups.product", locale)}${translate(
      "productGroups.product.ending.2-4",
      locale
    )}`;
  }

  return `${translate("productGroups.product", locale)}${translate(
    "productGroups.product.ending.other",
    locale
  )}`;
};

type ProductsCountByGroupType = {
  [key: string]: number;
};

export const getProductsCountByGroup = (
  products: IProduct[],
  groups: IGroup[]
) => {
  const productsCountByGroup: ProductsCountByGroupType = {};
  groups.forEach((group) => {
    const productsWithGroup = products.filter((product) =>
      product.groups.map((productGroup) => productGroup.id).includes(group.id)
    );
    productsCountByGroup[group.id] = productsWithGroup.length;
  });

  return productsCountByGroup;
};

export const getPriceWithDiscont = (price: number, discount?: number) => {
  if (!discount) return price;

  const priceWithDiscont = price - (price * discount) / 100;

  return priceWithDiscont.toFixed(2);
};

export const getPriceWithMarkup = (price: number, userRole: string) => {
  const markup = (price * 42.8) / 100;

  const resultPrice =
    userRole === userRoles.GUEST
      ? (price + markup).toFixed(2)
      : price.toFixed(2);

  return Number(resultPrice);
};

export const randomString = (i: number) => {
  let rnd = "";
  while (rnd.length < i) rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, i);
};

export const getRegistrationLink = (origin: string, link: string) => {
  return `${origin}${appRoutes.REGISTRATION}/${link}/1`;
};

export const copyToClpboard = (origin: string, link: string) => {
  return `${origin}${appRoutes.REGISTRATION}/${link}/1`;
};

export const mapToUplodaderFileList = (fileList: UploadFile[]) => {
  return (fileList || []).map((file) => ({
    uid: file.uid,
    name: file.name,
    status: file.status,
    url: file.response ? `/static/${file.response.url}` : "",
  }));
};

export const getAllTags = (products: IProduct[]) => {
  const tags = flatten(products.map((product) => product.tags).filter(Boolean));

  return uniq(tags);
};

export const mapToOrderProducts = (basket: BasketRow[]) => {
  const orderProducts = basket.map((basketRow) => {
    return {
      groups: basketRow.product.groups,
      brand: basketRow.product.brand,
      sku: basketRow.product.id,
      name: basketRow.product.name,
      price: basketRow.product.price,
      vopPrice: basketRow.product.vopPrice,
      count: basketRow.count,
      barCode: basketRow.product.barCode,
    };
  });

  return orderProducts;
};

interface IOrderPricingCalculationParams {
  country: number;
  city: number;
  deliveryAddress: string;
  deliveryMethod: string;
  totalWeight: number;
  destinationStationId?: number;
}

const operator_station_id = 10019920154;

export const getPricingCalculationBody = (
  values: IOrderPricingCalculationParams
) => {
  const {
    country,
    city,
    deliveryAddress,
    deliveryMethod,
    totalWeight,
    destinationStationId,
  } = values;

  const fullAddress = `${country}, ${city}, ${deliveryAddress}`;
  const destination =
    deliveryMethod === deliveryMethods.COURIER
      ? {
          address: fullAddress,
        }
      : {
          platform_station_id: destinationStationId,
        };
  const tariff =
    deliveryMethod === deliveryMethods.COURIER
      ? "time_interval"
      : "self_pickup";

  return {
    destination,
    tariff,
    total_weight: totalWeight,
    source: {
      platform_station_id: operator_station_id,
    },
  };
};
