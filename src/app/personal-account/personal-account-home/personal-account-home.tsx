import { useEffect, useState } from "react";
import { ChangePasswordModal } from "../../components/modals/auth/change-password-modal";
import { useAppSelector } from "../../hooks";
import { PrivateTradeTurnover } from "./private-trade-turnover";
import { GroupTradeTurnover } from "./group-trade-turnover";
import { NotFound } from "../../pages/404";
import { RewardBanner } from "./reward-banner";
import { MentorBonus } from "./mentor-bonus";
import { FinalDate } from "./final-date";
import { Link } from "react-router-dom";
import { personalAccountRoutes } from "../data/constants";
import axios from "axios";

export const PersonalAccountHome = () => {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const user = useAppSelector((state) => state.profile.user);

  if (!user) return <NotFound />;

  if (user.isTechnicalPassword && !isChangePasswordOpen) {
    setChangePasswordOpen(true);
  }
  const  getUserInfo = async ()=>{
    await axios
    .get(`${import.meta.env.VITE_API_URL}/api/user/my-structure/${user.id}`)
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <div className="lk__wrapper">
      <div className="lk__stats-list">
        <PrivateTradeTurnover referralId={user.referralId} />
        <GroupTradeTurnover referralId={user.referralId} />
        <MentorBonus referralId={user.referralId} />
        <FinalDate referralId={user.referralId} />
      </div>
      <ul className="lk__categories">
        <li className="lk__category">
          <Link to={`${personalAccountRoutes.BUSINESS}`}>
            <span>Моя структура</span>
            <svg
              width="57"
              height="57"
              viewBox="0 0 57 57"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M52.25 26.125V7.125H35.625V14.25H21.375V7.125H4.75V26.125H21.375V19H26.125V42.75H35.625V49.875H52.25V30.875H35.625V38H30.875V19H35.625V26.125H52.25Z" />
            </svg>
          </Link>
        </li>
        <li className="lk__category">
          <Link to={`${personalAccountRoutes.CLIENTS}`}>
            <span>Мои клиенты</span>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40 27.5C44.15 27.5 47.475 24.15 47.475 20C47.475 15.85 44.15 12.5 40 12.5C35.85 12.5 32.5 15.85 32.5 20C32.5 24.15 35.85 27.5 40 27.5ZM20 27.5C24.15 27.5 27.475 24.15 27.475 20C27.475 15.85 24.15 12.5 20 12.5C15.85 12.5 12.5 15.85 12.5 20C12.5 24.15 15.85 27.5 20 27.5ZM20 32.5C14.175 32.5 2.5 35.425 2.5 41.25V47.5H37.5V41.25C37.5 35.425 25.825 32.5 20 32.5ZM40 32.5C39.275 32.5 38.45 32.55 37.575 32.625C40.475 34.725 42.5 37.55 42.5 41.25V47.5H57.5V41.25C57.5 35.425 45.825 32.5 40 32.5Z" />
            </svg>
          </Link>
        </li>
        <li className="lk__category">
          <Link to={`${personalAccountRoutes.CLIENTS}`}>
            <span>Мои заказы</span>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40 27.5C44.15 27.5 47.475 24.15 47.475 20C47.475 15.85 44.15 12.5 40 12.5C35.85 12.5 32.5 15.85 32.5 20C32.5 24.15 35.85 27.5 40 27.5ZM20 27.5C24.15 27.5 27.475 24.15 27.475 20C27.475 15.85 24.15 12.5 20 12.5C15.85 12.5 12.5 15.85 12.5 20C12.5 24.15 15.85 27.5 20 27.5ZM20 32.5C14.175 32.5 2.5 35.425 2.5 41.25V47.5H37.5V41.25C37.5 35.425 25.825 32.5 20 32.5ZM40 32.5C39.275 32.5 38.45 32.55 37.575 32.625C40.475 34.725 42.5 37.55 42.5 41.25V47.5H57.5V41.25C57.5 35.425 45.825 32.5 40 32.5Z" />
            </svg>
          </Link>
        </li>
        <li className="lk__category">
          <Link to={`${personalAccountRoutes.CLIENTS}`}>
            <span>Сделать заказ</span>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40 27.5C44.15 27.5 47.475 24.15 47.475 20C47.475 15.85 44.15 12.5 40 12.5C35.85 12.5 32.5 15.85 32.5 20C32.5 24.15 35.85 27.5 40 27.5ZM20 27.5C24.15 27.5 27.475 24.15 27.475 20C27.475 15.85 24.15 12.5 20 12.5C15.85 12.5 12.5 15.85 12.5 20C12.5 24.15 15.85 27.5 20 27.5ZM20 32.5C14.175 32.5 2.5 35.425 2.5 41.25V47.5H37.5V41.25C37.5 35.425 25.825 32.5 20 32.5ZM40 32.5C39.275 32.5 38.45 32.55 37.575 32.625C40.475 34.725 42.5 37.55 42.5 41.25V47.5H57.5V41.25C57.5 35.425 45.825 32.5 40 32.5Z" />
            </svg>
          </Link>
        </li>
      </ul>
      <RewardBanner />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        setIsOpen={setChangePasswordOpen}
      />
    </div>
  );
};
