import { useEffect, useState } from "react";
import { ChangePasswordModal } from "../../components/modals/auth/change-password-modal";
import { useAppSelector } from "../../hooks";
import { PrivateTradeTurnover } from "./private-trade-turnover";
import { GroupTradeTurnover } from "./group-trade-turnover";
import { NotFound } from "../../pages/404";
import { MentorBonus } from "./mentor-bonus";
import { FinalDate } from "./final-date";
import { Link } from "react-router-dom";
import { personalAccountRoutes } from "../data/constants";
import { useFetchOfficeQuery } from "../../../features/api/user-info-slice";
import { useFetchGiftQuery } from "../../../features/api/my-gift-api-slice";
import { appRoutes } from "../../constants";

export const PersonalAccountHome = () => {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const user = useAppSelector((state) => state.profile.user);

  if (!user) return <NotFound />;

  if (user.isTechnicalPassword && !isChangePasswordOpen) {
    setChangePasswordOpen(true);
  }

  const id = user?.id ? user?.id : 0;

  const { data: office } = useFetchOfficeQuery(id);
  const { data: gift } = useFetchGiftQuery(id);
  const [finance,setFinance] = useState()

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/finance/get`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId:id}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if(data){
          setFinance(data)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="lk__wrapper">
      <div className="lk__stats-list">
        <PrivateTradeTurnover referralId={user.referralId} office={office} />
        <GroupTradeTurnover referralId={user.referralId} office={office} />
        <MentorBonus referralId={user.referralId} gift={gift} finance = {finance} />
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
          <Link to={`${personalAccountRoutes.MY_ORDERS}`}>
            <span>Мои заказы</span>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 5.5L3.21429 7L7.5 3"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M2 12.5L3.21429 14L7.5 10"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M2 19.5L3.21429 21L7.5 17"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M22 12H17M12 12H13.5"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />{" "}
                <path
                  d="M12 19H17M20.5 19H22"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />{" "}
                <path
                  d="M22 5L12 5"
                  stroke="#b3db11"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />{" "}
              </g>
            </svg>
          </Link>
        </li>
        <li className="lk__category">
          <Link to={`${appRoutes.CATALOG}`}>
            <span>Сделать заказ</span>
            <svg
              width="800px"
              height="800px"
              viewBox="0 -2 19.001 19.001"
              xmlns="http://www.w3.org/2000/svg"
              fill="##b3db11"
              stroke="##b3db11"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  id="Path_14"
                  data-name="Path 14"
                  d="M473.974,826v-1h12v1Zm0,2h11v1h-11Zm9.987,4.02h-9.992a2.664,2.664,0,0,1-2.71-2.66l-.8-7.36h-3.484v-1h4.406l.869,8.36a1.874,1.874,0,0,0,1.72,1.633h9.992v1.027Zm-10.487.98a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,473.474,833Zm-.531,1.969h1V834h-1ZM481.474,833a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,481.474,833Zm-.531,1.969h1V834h-1Z"
                  transform="translate(-466.973 -821)"
                  fill="#b3db11"
                />{" "}
              </g>
            </svg>
          </Link>
        </li>
      </ul>
      {/* <RewardBanner /> */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        setIsOpen={setChangePasswordOpen}
      />
    </div>
  );
};
