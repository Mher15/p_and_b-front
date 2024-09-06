import { useAppSelector } from "../../hooks";
import { PersonalAccountBanners } from "../banners/lk-banners";
import { useFetchProfileQuery } from "../../../features/api/user-api-slice";
import { LeftSideLinks } from "./left-side-links";
import { ReferralLinks } from "./referral-links";
import { LeftSideHeader } from "./left-side-header";
import { Outlet, useLocation } from "react-router-dom";
import { ILink } from "../../types";
import { isEmpty } from "lodash";
import { financeAccountRoutes, personalAccountRoutes } from "../data/constants";
import { translate } from "../../translation";
import { CoApplicantData } from "../co-applicant-data/co-applicant-data";

const getLink = (pathname: string, locale: string) => {
  const pathArr = pathname.split("/").filter((part) => !isEmpty(part));
  const path = pathArr[pathArr.length -1] ? pathArr[pathArr.length -1] : null;
  switch (`${path}`) {
    case personalAccountRoutes.REFERRAL_LINKS:
      return {
        to: personalAccountRoutes.REFERRAL_LINKS,
        translate: translate("links.personalAccount.office", locale),
      };
    case personalAccountRoutes.BUSINESS:
      return {
        to: personalAccountRoutes.BUSINESS,
        translate: translate("links.personalAccount.business", locale),
      };
    case personalAccountRoutes.FINANCE:
      return {
        to: personalAccountRoutes.FINANCE,
        translate: translate("links.personalAccount.finance", locale),
      };
    case personalAccountRoutes.PROFILE:
      return {
        to: personalAccountRoutes.PROFILE,
        translate: translate("links.personalAccount.profile", locale),
      };
    case personalAccountRoutes.CLIENTS:
      return {
        to: personalAccountRoutes.CLIENTS,
        translate: translate("links.personalAccount.clients", locale),
      };
    case personalAccountRoutes.STATEMENT:
      return {
        to: personalAccountRoutes.STATEMENT,
        translate: translate("links.personalAccount.statement", locale),
      };
    case personalAccountRoutes.SYSTEM:
      return {
        to: personalAccountRoutes.SYSTEM,
        translate: translate("links.personalAccount.system", locale),
      };
    case personalAccountRoutes.MY_ORDERS:
      return {
        to: personalAccountRoutes.MY_ORDERS,
        translate: translate("links.personalAccount.orders", locale),
      };
    case financeAccountRoutes.FINANCE_BALANCE:
      return {
        to: financeAccountRoutes.FINANCE_BALANCE,
        translate: translate("links.personalAccount.balance", locale),
      };
    case personalAccountRoutes.CLIENTS:
      return {
        to: personalAccountRoutes.CLIENTS,
        translate: translate("links.personalAccount.clients", locale),
      };

      case financeAccountRoutes.FINANCE_TRANSACTIONS:
        return{
          to: financeAccountRoutes.FINANCE_TRANSACTIONS,
          translate: translate("links.personalAccount.transaction", locale),
        }
      case financeAccountRoutes.FINANCE_PAYMENTS:
        return{
          to: financeAccountRoutes.FINANCE_PAYMENTS,
          translate: translate("links.personalAccount.payments", locale),
        }

    default:
      return {
        to: personalAccountRoutes.HOME,
        translate: translate("links.personalAccount.office", locale),
      };
  }
};

export const LeftSide = () => {
  const user = useAppSelector((state) => state.profile.user);
  const id = user?.id ? user?.id : 0;
  const { data: profile } = useFetchProfileQuery(id);

  const locale = useAppSelector((state) => state.profile.locale);
  const { pathname } = useLocation();
  const link: ILink = getLink(pathname, locale);

  return (
    user &&
    profile && (
      <aside className="lk-menu lk__menu">
        <div className="lk-menu__left-side">
          <LeftSideHeader profile={profile} user={user} />
          <div className="lk-menu__inner">
            <ReferralLinks />
            <LeftSideLinks />
            <PersonalAccountBanners />
          </div>
        </div>
        <div className="lk-menu__right-side">
          <div>
            <h1 className="title lk__main-title">{link.translate}</h1>
          </div>
          <Outlet />
        </div>
      </aside>
    )
  );
};
