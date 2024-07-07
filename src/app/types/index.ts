import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TableProps } from "antd";
import { ReactNode } from "react";

export type FileUrlType = string;

export interface IUser {
  id: number;
  role: string;
  referralId: string;
  name: string;
  lastName: string;
  email: string;
  isTechnicalPassword: boolean;
}

export interface IFormGroup {
  name: string;
  image: FileUrlType;
  description?: string;
}

export interface IGroup {
  id: number;
  name: string;
  image: FileUrlType;
  description?: string;
}

export interface IDocument {
  id: number;
  name: string;
  file: FileUrlType;
}

export interface IFormDocument {
  name: string;
  file: FileUrlType;
}

export interface IFormBrand {
  name: string;
  image: FileUrlType;
  description?: string;
}

export interface IBrand {
  id: number;
  name: string;
  image: FileUrlType;
  description?: string;
}

export interface IImage {
  id: number;
  file: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IFormProduct {
  groups: IGroup[] | undefined;
  brand: IBrand | undefined;
  sku: number;
  name: string;
  description: string;
  utility: string;
  methodOfAdministration: string;
  compound: FileUrlType;
  documents: IDocument[] | undefined;
  price: number;
  vopPrice: number;
  images: IImage[];
  tags?: ITag[];
  discount?: number;
  weight: number;
  barCode: number;
}

export interface IProduct {
  id: number;
  groups: IGroup[];
  brand: IBrand;
  sku: number;
  name: string;
  description: string;
  shortDescription: string;
  utility: string;
  methodOfAdministration: string;
  compound: FileUrlType;
  documents: IDocument[];
  price: number;
  vopPrice: number;
  images: IImage[];
  tags?: ITag[];
  discount?: number;
  weight: number;
  barCode: number;
  isAvailable: boolean;
}

export interface ITableProductItem {
  id: number;
  groups: IGroup[];
  brand: IBrand;
  sku: number;
  name: string;
  description: string;
  shortDescription: string;
  utility: string;
  methodOfAdministration: string;
  compound: FileUrlType;
  documents: IDocument[];
  price: number;
  vopPrice: number;
  images: IImage[];
  tags?: ITag[];
  discount?: number;
  weight: number;
  barCode: number;
  key: string;
}

export interface BasketRow {
  product: IProduct;
  count: number;
}

export interface IAuthontificationFormValues {
  password: string;
  phone: string;
}

export interface IRegistrationUserData {
  country: ICountry;
  city: ICity;
  region?: IRegion;
  street: string;
  houseNumber: number;
  lastName: string;
  name: string;
  patronymic?: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  gender: string;
  agreement: boolean;
  mentor: IMentorDto;
}

export interface IRegistrationData {
  countryId: number;
  cityId: number;
  regionId: number;
  street: string;
  houseNumber: number;
  lastName: string;
  name: string;
  patronymic?: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  gender: string;
  agreement: boolean;
  mentor: string;
  role: string;
}

export interface IRegistrationStep3FormValues {
  country: number;
  city: number;
  region: number;
  street: string;
  houseNumber: number;
  lastName: string;
  name: string;
  patronymic?: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  gender: string;
  agreement: boolean;
}

export interface IOrderProductCreate {
  groups: IGroup[];
  brand: IBrand;
  sku: number;
  name: string;
  price: number;
  vopPrice: number;
  count: number;
}

export interface IOrderProduct {
  id: number;
  sku: number;
  name: string;
  price: number;
  vopPrice: number;
  count: number;
}

export interface IOrderFormValues {
  deliveryCountry: number;
  deliveryCity: number;
  deliveryAddress: string;
  deliveryMethod: string;
  lastName: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  comment: string;
  destinationStationId: string;
  offer: IDeliveryOffer;
}

export interface IOrder {
  id: number;
  deliveryCountry: number;
  deliveryCity: number;
  deliveryPrice: number;
  productsPrice: number;
  productsVolumePrice: number;
  price: number;
  deliveryAddress: string;
  deliveryMethod: string;
  lastName: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  comment: string;
  products: IOrderProduct[];
  status: string;
}

export interface IOrderCreate {
  deliveryCountry: number;
  deliveryCity: number;
  deliveryPrice: number;
  productsPrice: number;
  productsVolumePrice: number;
  price: number;
  deliveryAddress: string;
  deliveryMethod: string;
  lastName: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  comment: string;
  products: IOrderProductCreate[];
}

export interface IStoreItem {
  id: number;
  product: IProduct;
  count: number;
}

export interface IReferralLinkCreate {
  referralId: string;
  role: string;
}
export interface IReferralLink {
  id: number;
  name: string;
  referralId: string;
  role: string;
}

export interface IMentorDto {
  name: string;
  lastName: string;
  referralId: string;
  id: number;
}

export interface IStoreItemCreate {
  productId: number;
  count: number;
}

export type IStore = IStoreItem[];

export interface ICompanyInfo {
  id: number;
  companyName: string;
  phone: string;
  telegram: string;
  email: string;
  inn: number;
}

export interface IGiftLevel {
  id: number;
  level: number;
  percent: number;
}

export interface IAmbassadorLevel {
  id: number;
  partnerCount: number;
  reward: number;
}

export interface IExchangeRate {
  id: number;
  country: number;
  rate: number;
}
export interface IMarketing {
  id: number;
  file: string;
  giftLevels: IGiftLevel[];
  ambassadorLevels: IGiftLevel[];
  mentorBonusLevel: number;
  mentorBonusPercent: number;
  rewardsLevel: number;
  rewardsMoreThen: number;
  rewardsPercent: number;
  dateOfRewards: string;
  exchangeRates: IExchangeRate[];
}

export interface IModalFormErrors {
  [key: string]: string | undefined;
}

export interface ICreateEditModal<T> {
  isOpen: boolean;
  form: string;
  errors: string;
  formValues: T;
}

export interface IAuthModal {
  isOpen: boolean;
}

export interface OpenCloseModalPayload<T> {
  isOpen: boolean;
  formValues?: T;
}

export interface ISliderProps<T> {
  chunkSize: number;
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export interface ISearchParams {
  [keu: string]: string;
}

export interface IAdminTableProps<T> {
  dataSource: T[];
  columns: TableProps<T>["columns"];
  title: string;
  createItem?: () => void;
  updateItem?: (item: T) => void;
  deleteItem?: (item: T) => void;
  isLoading?: boolean;
}

export interface ICountry {
  id: number;
  name: string;
}
export interface IDate {
  id: number;
  name: string;
  value:string;
}

export interface IRegion {
  id: number;
  name: string;
  country: ICountry;
}

export interface ICity {
  id: number;
  name: string;
  country: ICountry;
  region: IRegion;
}

export interface IQueryResponse<T> {
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
}

export interface IRegistrationResponse {
  token: string;
  password: string;
}

export interface IAuthentificationResponse {
  token: string;
}

export interface IChangePasswordResponse {
  token: string;
}
export interface IOrderCreateResponse {
  orderId: string;
}

export interface IOrderPaymentResponse {
  result: string;
}

export interface IUplodaderFile {
  uid: string;
  name: string;
  status: string;
  url: string;
}

export interface ILocationDetectParams {
  cityId: number;
  countryId: number;
}

export interface ILocation {
  address: string;
  geo_id: number;
}
export interface ILocationDetect {
  variants: ILocation[];
}

export interface IPickupPointsListParams {
  countryId: number;
  cityId: number;
}
export interface IDeliveryOfferParams {
  countryId: number;
  cityId: number;
  deliveryAddress: string;
}
export interface IDeliveryOffer {
  delivered_by_post: boolean;
  from: number;
  to: number;
}

export interface IPricingCalculationParams {
  countryId: number;
  cityId: number;
  deliveryAddress: string;
  deliveryMethod: string;
  totalWeight: number;
  destinationStationId: number;
}

export interface IPickupPoint {
  address: {
    comment: string;
    full_address: string;
    room: string;
  };
  contact: {
    email: string;
    first_name: string;
    last_name: string;
    partonymic: string;
    phone: string;
  };
  id: string;
  instruction: string;
  is_dark_store: boolean;
  is_market_partner: boolean;
  is_post_office: boolean;
  is_yandex_branded: boolean;
  name: string;
  payment_methods: [string];
  position: {
    latitude: number;
    longitude: number;
  };
  schedule: {
    restrictions: [
      {
        days: [number];
        time_from: {
          hours: number;
          minutes: number;
        };
        time_to: {
          hours: number;
          minutes: number;
        };
      }
    ];
    time_zone: number;
  };
  type: string;
}

export interface ILink {
  to: string;
  translate: string;
}
export interface IProfile {
  referralId: string;
  registrationDate: string;
  validUntil: string;
  name: string;
  lastName: string;
  patronymic: string;
  gender: string;
  dateOfBirth: string;
  country: ICountry;
  city: ICity;
  region: IRegion;
  address: string;
  phone: string;
  email: string;
  mentor: IMentorDto;
  houseNumber: number;
  street: string;
  avatar: string;
  contractIsValidUntil: string;
}

export interface IUserData {
  country: ICountry;
  city: ICity;
  region: IRegion;
  phone: string;
  email: string;
  houseNumber: number;
  street: string;
  avatar: string;
}

export interface IPersonalAccountClient {
  name: string;
  lastName: string;
  referralId: string;
  privateTradeTurnover: number;
  mentor: IMentorDto;
}

export interface IPersonalAccountPartner {
  name: string;
  lastName: string;
  referralId: string;
  privateTradeTurnover: number;
  groupTradeTurnover: number;
  mentor: IMentorDto;
  isAmbassador: boolean;
}

export interface IPersonalAccountTransaction {
  date: string;
  amount: number;
  type: string;
  accountId: number;
}
