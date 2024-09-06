import { Link, useLocation, useSearchParams } from "react-router-dom";
import { appRoutes } from "../../constants";
import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";
import { ILink, IProduct } from "../../types";
import { isEmpty } from "lodash";

interface IBreadcrumbsProps {
  product?: IProduct;
}

const getLink = (pathname: string, locale: string) => {
  const pathArr = pathname.split("/").filter((part) => !isEmpty(part));
  const [first] = pathArr;
  switch (`/${first}`) {
    case appRoutes.CATALOG:
      return {
        to: appRoutes.CATALOG,
        translate: translate("links.catalog", locale),
      };
    case appRoutes.ABOUT_US:
      return {
        to: appRoutes.ABOUT_US,
        translate: translate("links.aboutCompany", locale),
      };
    case appRoutes.PERSONAL_ACCOUNT:
      return {
        to: appRoutes.PERSONAL_ACCOUNT,
        translate: translate("links.personalAccount", locale),
      };
    case appRoutes.BASKET:
      return {
        to: appRoutes.BASKET,
        translate: translate("links.basket", locale),
      };
    case appRoutes.PRODUCTS:
      return {
        to: appRoutes.CATALOG,
        translate: translate("links.catalog", locale),
      };
    case appRoutes.ORDER:
      return {
        to: appRoutes.ORDER,
        translate: translate("links.order", locale),
      };
    case appRoutes.PAYMENT_PAGE:
      return {
        to: appRoutes.PAYMENT_PAGE,
        translate: translate("links.payment", locale),
      };
    case appRoutes.CONTACTS:
      return {
        to: appRoutes.CONTACTS,
        translate: translate("links.contacts", locale),
      };
    case appRoutes.PAYMENT_RULES:
      return {
        to: appRoutes.PAYMENT_RULES,
        translate: translate("links.pymentRules", locale),
      };
    case appRoutes.PURCHASE_RETURNS:
      return {
        to: appRoutes.PURCHASE_RETURNS,
        translate: translate("links.purchaseReturns", locale),
      };
    case appRoutes.CANCELETION_OF_SERVICE:
      return {
        to: appRoutes.CANCELETION_OF_SERVICE,
        translate: translate("links.cancellationOfService", locale),
      };
    case appRoutes.TERMS_OF_USE:
      return {
        to: appRoutes.TERMS_OF_USE,
        translate: translate("links.termsOfUse", locale),
      };
    case appRoutes.BUSINESS:
      return {
        to: appRoutes.BUSINESS,
        translate: translate("links.business", locale),
      };
    case appRoutes.CLIENTS:
      return {
        to: appRoutes.CLIENTS,
        translate: translate("links.clients", locale),
      };
    case appRoutes.PAYMENTS:
      return {
        to: appRoutes.PAYMENTS,
        translate: translate("links.payments", locale),
      };
    case appRoutes.TRANSACTION:
      return {
        to: appRoutes.TRANSACTION,
        translate: translate("links.transactions", locale),
      };
    case appRoutes.FINANCE:
      return {
        to: appRoutes.FINANCE,
        translate: translate("links.finance", locale),
      };
    case appRoutes.FINANCE_BALANCE:
      return {
        to: appRoutes.FINANCE_BALANCE,
        translate: translate("links.balance", locale),
      };
    case appRoutes.STATEMENT:
      return {
        to: appRoutes.STATEMENT,
        translate: translate("links.statement", locale),
      };
    case appRoutes.SYSTEM:
      return {
        to: appRoutes.SYSTEM,
        translate: translate("links.system", locale),
      };
    case appRoutes.MY_ORDERS:
      return {
        to: appRoutes.MY_ORDERS,
        translate: translate("links.orders", locale),
      };
    default:
      return {
        to: appRoutes.HOME,
        translate: translate("links.home", locale),
      };
  }
};

const PathLink = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  let parentRout = "";
  return paths.map((element, index) => {
    const link: ILink = getLink("/" + element, locale);
    if (index > 0) {
      parentRout += link.to;
      return (
        <Link key={index} to={parentRout}>
          {index > 1 ? "/" : ""}
          {link.translate}
        </Link>
      );
    }
  });
};

export const Breadcrumbs = ({ product }: IBreadcrumbsProps) => {
  const [searchParams] = useSearchParams();
  const groupParam = searchParams.get("group");
  const productGroup = product?.groups[0].name;

  const group = groupParam || productGroup;

  return (
    <div className="pagination about__pagination">
      <div className="container">
        <ul className="pagination__list">
          <li className="pagination__item pagination__item--home">
            <Link to={appRoutes.HOME}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 10L12 3L20 10V20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2044 9 16V20H4V10Z" />
              </svg>
            </Link>
          </li>
          <li
            className={`pagination__item path_link ${
              !group && !product ? "active" : ""
            }`}
          >
            <PathLink />
          </li>
          <li
            className={`pagination__item ${group && !product ? "active" : ""}`}
          >
            <Link to={`${appRoutes.CATALOG}?group=${group}`}>{group}</Link>
          </li>
          {product && (
            <li className="pagination__item active">
              <Link to={`${appRoutes.PRODUCT}/${product.id}`}>
                {product.name}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <picture className="pagination__banner">
        <source srcSet="/images/pagination_bg.jpg, /images/pagination_bg@2x.jpg 2x" />
        <img src="/images/pagination_bg.jpg" alt="" />
      </picture>
    </div>
  );
};
