import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";
import { Copyright } from "./copyright";
import { appRoutes } from "../../constants";
import { Link } from "react-router-dom";
import { useFetchCompanyInfoQuery } from "../../../features/api/company-info-api-slice";
import { Loader } from "../loader/loader";
import styled from "styled-components";

const StyledPayIcons = styled.img`
  width: 100%;
`;

export const Footer = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: companyInfo, isLoading } = useFetchCompanyInfoQuery();

  if (isLoading) return <Loader />;

  const companyTelegram = companyInfo?.telegram;
  const telegramLink = (companyTelegram || "").replace("@", "https://t.me/");

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__item">
              <Link className="logo footer__logo" to={appRoutes.ABOUT_US}>
                <img src="/images/logo-white.svg" alt="" />
                <span className="logo__text">
                  {translate("footer.logo.text", locale)}
                </span>
              </Link>
              <ul className="footer__links footer__links--secondary">
                <li className="footer__link">
                  <Link to={appRoutes.PRIVACY_POLICY}>
                    {translate("footer.privacyPolicy", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.PUBLIC_OFFER}>
                    {translate("footer.publicOffer", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.TERMS_OF_PAYMENT}>
                    {translate("footer.termsOfPayment", locale)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <ul className="footer__links">
                <li className="footer__link footer__link--title">
                  <Link to={appRoutes.CATALOG}>
                    {translate("links.catalog", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.PAYMENT_RULES}>
                    {translate("links.pymentRules", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.PURCHASE_RETURNS}>
                    {translate("links.purchaseReturns", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.CANCELETION_OF_SERVICE}>
                    {translate("links.cancellationOfService", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.TERMS_OF_USE}>
                    {translate("links.termsOfUse", locale)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <ul className="footer__links">
                <li className="footer__link footer__link--title">
                  <span>О Best&People</span>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.ABOUT_US}>
                    {translate("links.aboutCompany", locale)}
                  </Link>
                </li>
                <li className="footer__link">
                  <Link to={appRoutes.CONTACTS}>
                    {translate("hashlinks.contacts", locale)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              {companyInfo?.phone && (
                <a className="footer__phone" href={`tel:${companyInfo.phone}`}>
                  <img src="/images/icons/phone-green.svg" alt="" />
                  {companyInfo.phone}
                </a>
              )}
              <ul className="footer__links footer__links--socials">
                <li className="footer__link">
                  {companyInfo?.email && (
                    <a href="mailto:info@best-and-people.ru">
                      <img src="/images/icons/email.svg" alt="" />
                      {companyInfo.email}
                    </a>
                  )}
                </li>
                <li className="footer__link">
                  {companyInfo?.telegram && (
                    <a href={telegramLink}>
                      <img src="/images/icons/telegram.svg" alt="" />
                      {companyTelegram}
                    </a>
                  )}
                </li>
                <li className="footer__link">
                  <span>
                    <img src="/images/icons/time.svg" alt="" />
                    24/7
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div className="footer__item">
            <ul className="footer__links">
              <li className="footer__link footer__link--title">
                <span>Способы оплаты:</span>
              </li>
              <li className="footer__link">
                <picture>
                  <source srcSet="/images/horizontal_logos.png" />
                  <StyledPayIcons src="/images/horizontal_logos.png" alt="" />
                </picture>
              </li>
            </ul>
          </div>
        </div>
        <picture className="footer__bg">
          <source
            srcSet="/images/footer_bg.jpg, /images/footer_bg@2x.jpg 2x"
            media="(min-width: 767px)"
          />
          <source
            srcSet="/images/footer_bg-sm.jpg, /images/footer_bg-sm@2x.jpg 2x"
            media="(max-width: 767px)"
          />
          <img src="/images/footer_bg.jpg" alt="" />
        </picture>
      </div>
      <Copyright />
    </footer>
  );
};
