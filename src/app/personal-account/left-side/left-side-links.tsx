import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUser } from "../../../features/profile/profile-slice";
import { LOCAL_STORAGE_TOKEN_KEY, appRoutes } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { personalAccountRoutes } from "../data/constants";
import { useState } from "react";

const isActive = (route: string, pathname: string) => {
  const pathArr = pathname.split("/").filter((part) => (part ? part : ""));
  const active = route === pathArr[1];
  return active;
};

const ExitButton = styled.span`
  cursor: pointer;
`;

export const LeftSideLinks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleExit = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    dispatch(setUser(null));
    navigate(`${appRoutes.HOME}`);
  };

  return (
    <ul className="lk-menu__links">
      <li
        className={`lk-menu__link ${isActive(
          personalAccountRoutes.HOME,
          pathname
        )}`}
      >
        <Link to={personalAccountRoutes.HOME}>
          <img src="/images/icons/office.svg" alt="" />
          <span>Мой офис</span>
        </Link>
      </li>
      <li
        className={`lk-menu__link ${isActive(
          personalAccountRoutes.BUSINESS,
          pathname
        )}`}
      >
        <Link to={personalAccountRoutes.BUSINESS}>
          <img src="/images/icons/graph.svg" alt="" />
          <span>Моя структура</span>
        </Link>
      </li>
      <li className={`lk-menu__link ${isActive(
          personalAccountRoutes.BUSINESS,
          pathname
        )}`}>
        <Link to={personalAccountRoutes.STATEMENT}>
          <img src="/images/icons/bank-statement-icon.svg" alt="" />
          <span>Стейтмент</span>
        </Link>
      </li>
      <li className={`lk-menu__link ${isActive(
          personalAccountRoutes.BUSINESS,
          pathname
        )}`}>
        <Link to={personalAccountRoutes.SYSTEM}>
          <img src="/images/icons/cogwheel.svg" alt="" />
          <span>Система работы</span>
        </Link>
      </li>
      <li
        className={`lk-menu__link ${isActive(
          personalAccountRoutes.FINANCE,
          pathname
        )}`}
      >
        <Link to={personalAccountRoutes.FINANCE}>
          <img src="/images/icons/fin-card.svg" alt="" />
          <span>Финансы</span>
        </Link>
      </li>
      <li className="lk-menu__link">
        <ExitButton onClick={handleExit}>Выход</ExitButton>
      </li>
    </ul>
  );
};
