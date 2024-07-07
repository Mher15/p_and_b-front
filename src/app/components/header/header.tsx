import { MainLogo } from "../main-logo";
import { HeaderActions } from "./header-actions/header-actions";
import { useState } from "react";
import { translate } from "../../translation";
import { useAppSelector } from "../../hooks";
import { Dropdown } from "./dropdown";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { appRoutes } from "../../constants";
import { useFetchCompanyInfoQuery } from "../../../features/api/company-info-api-slice";

export const Header = () => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const { data: companyInfo, isLoading } = useFetchCompanyInfoQuery();

  const showPhone = !isLoading && companyInfo?.phone;
  const isAdmin = user?.role === "ADMIN";

  const handleDropdownClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <header className={`header ${isDropdownVisible ? "open" : ""}`}>
      <div className="container header__container">
        <button
          className={`hamburger header__menu-trigger ${
            isHamburgerOpen ? "open" : ""
          }`}
          onClick={handleHamburgerClick}
        >
          <span className="hamburger__lines">
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
          </span>
        </button>
        <MainLogo />
        <nav className={`header__nav ${isHamburgerOpen ? "open" : ""}`}>
          <ul className="header__links">
            <li
              className={`dropdown header__link header__dropdown ${
                isDropdownVisible ? "open" : ""
              }`}
            >
              <button
                className={`btn--reset ${isDropdownVisible ? "open" : ""}`}
                onClick={handleDropdownClick}
              >
                <span>
                  {translate("links.catalog", locale)}
                  <img src="/images/icons/arrow-down.svg" alt="" />
                </span>
              </button>
              <Dropdown
                isOpen={isDropdownVisible}
                setIsOpen={setDropdownVisible}
                setHamburgerOpen={setHamburgerOpen}
              />
            </li>
            <li className={`header__link`} onClick={handleHamburgerClick}>
              <Link to={appRoutes.CONTACTS} onClick={handleHamburgerClick}>
                {translate("hashlinks.contacts", locale)}
              </Link>
            </li>
            <li className="header__link">
              <Link to={appRoutes.ABOUT_US} onClick={handleHamburgerClick}>
                {translate("hashlinks.aboutCompony", locale)}
              </Link>
            </li>
          </ul>
          <div className="header__submenu">
            {!isAdmin && showPhone && (
              <a className="header__phone" href={`tel:${companyInfo.phone}`}>
                <img src="/images/icons/phone.svg" alt="" />
                <span>{companyInfo.phone}</span>
              </a>
            )}
            {isAdmin && <Link to={appRoutes.ADMIN}>админка</Link>}
            <ul className="header__socials">
              <li className="header__social">
                <a href="#">
                  <img src="/images/icons/telegram-ylw.svg" alt="" />
                </a>
              </li>
              <li className="header__social">
                <a href="#">
                  <img src="/images/icons/email-ylw.svg" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <HeaderActions />
      </div>
    </header>
  );
};
