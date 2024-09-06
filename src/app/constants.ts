export const LOCAL_STORAGE_TOKEN_KEY = "token";

export const appRoutes = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT: "/products/:productId",
  CATALOG: "/catalog",
  BASKET: "/basket",
  ADMIN: "/admin",
  ABOUT_US: "/aboutUs",
  ORDER: "/order",
  REGISTRATION: "/registration",
  PERSONAL_ACCOUNT: "/personal-account",
  BUSINESS: "/business",
  FINANCE: "/finance",
  CLIENTS: "/clients",
  STATEMENT: "/statement",
  SYSTEM:"/system",
  MY_ORDERS:"/orders",
  FINANCE_BALANCE: "/balance",
  PUBLIC_OFFER: "/public-offer",
  TERMS_OF_PAYMENT: "/terms-of-payment",
  PRIVACY_POLICY: "/privacy-policy",
  PAYMENT_PAGE: "/payment-page",
  TRANSACTION: "/transactions",
  PAYMENTS: "/payments",
  CONTACTS: "/contacts",
  PAYMENT_RULES: "/payment-rules",
  PURCHASE_RETURNS: "/purchase-returns",
  TERMS_OF_USE: "/terms-of-use",
  CANCELETION_OF_SERVICE: "/cancellation-of-service",
};

export const endpointsTags = {
  GROUP: "GROUP",
  BRAND: "BRAND",
  PRODUCT: "PRODUCT",
  FAVORITE_PRODUCT: "FAVORITE_PRODUCT",
  COMPANY_INFO: "COMPANY_INFO",
  CHECK_AUTH: "CHECK_AUTH",
  STORE: "STORE",
  FAVORITE_PRODUCTS: "FAVORITE_PRODUCTS",
  ORDERS: "ORDERS",
  PROFILE: "PROFILE",
  MARKETING: "MARKETING",
  DOCUMENT: "DOCUMENT",
  FINANCE:"FINANCE"
};

export const DASH = "&nbsp;";

export const buttonSizes = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export const buttonTypes = {
  FILL: "fill",
  BORDER: "border",
  GHOST: "ghost",
};
export const userRoles = {
  GUEST: "GUEST",
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  PARTNER: "PARTNER",
  SUPERVISOR: "SUPERVISOR",
};

const deviceSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${deviceSize.mobileS})`,
  mobileM: `(max-width: ${deviceSize.mobileM})`,
  mobileL: `(max-width: ${deviceSize.mobileL})`,
  tablet: `(max-width: ${deviceSize.tablet})`,
  laptop: `(max-width: ${deviceSize.laptop})`,
  laptopL: `(max-width: ${deviceSize.laptopL})`,
  desktop: `(max-width: ${deviceSize.desktop})`,
  desktopL: `(max-width: ${deviceSize.desktop})`,
};

const { CLIENT, PARTNER } = userRoles;

export const roleTranslationMap = {
  [CLIENT]: "registration.step3.clint",
  [PARTNER]: "registration.step3.partner",
};

export const deliveryMethods = {
  YOU_SELF: "youSelf",
  PICKUP: "pickup",
  COURIER: "courier",
};
