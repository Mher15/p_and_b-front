import { useEffect, useState } from "react";
import { useFetchProfileQuery } from "../../../features/api/user-api-slice";
import { Loader } from "../../components/loader";
import { useAppSelector } from "../../hooks";
import moment from "moment";
import { ChangePasswordModal } from "../../components/modals/auth/change-password-modal";
import { UserUpsetModal } from "../upset-modal";
import { isEmpty } from "lodash";
import { CoApplicantData } from "../co-applicant-data/co-applicant-data";
import axios from "axios";

export const PersonalAccountProfile = () => {
  const user = useAppSelector((state) => state.profile.user);
  const id = user?.id ? user?.id : 0;
  const { data: profile, isLoading } = useFetchProfileQuery(id);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isChangeUserDataOpen, setChangeUserDataOpen] = useState(false);
  const [coaplicantData, setCoaplicantData] = useState<any>(null);

  const handleChangePassword = () => {
    setChangePasswordOpen(!isChangePasswordOpen);
  };
  const handleChangeUserData = () => {
    setChangeUserDataOpen(!isChangeUserDataOpen);
  };

  if (isLoading || !profile) return <Loader />;

  useEffect(() => {
    if(!coaplicantData){
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/coapplicant/${id}`
        )
        .then((response) => {
          if(response){
            setCoaplicantData({...response.data})
            console.log("response.data", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="lk__wrapper lk__blocks">
        <div className="lk__block lk__block--data">
          <h2 className="title lk__block-title">Мои данные</h2>
          <dl className="lk__block-list">
            <div>
              <dt>ID</dt>
              <dd>{profile.referralId}</dd>
            </div>
            <div>
              <dt>Дата регистрации</dt>
              <dd>
                <time dateTime="2024-01-15">{`${moment(
                  profile.registrationDate
                ).format("DD.MM.YYYY")} `}</time>
              </dd>
            </div>
            <div>
              <dt>Контракт действителен до</dt>
              <dd>
                <time dateTime="2024-02-15">{`${moment(
                  profile.contractIsValidUntil
                ).format("DD.MM.YYYY")} `}</time>
              </dd>
            </div>
          </dl>
        </div>
        <div className="lk__block lk__block--personal-data">
          <h2 className="title lk__block-title">Личные данные</h2>
          <dl className="lk__block-list">
            <div>
              <dt>Фамилия</dt>
              <dd>{profile.lastName}</dd>
            </div>
            <div>
              <dt>Имя</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>Отчество</dt>
              <dd>{profile.patronymic}</dd>
            </div>
            <div>
              <dt>Дата рождения</dt>
              <dd>{profile.dateOfBirth}</dd>
            </div>
            <div>
              <dt>Пол</dt>
              <dd>{profile.gender === "male" ? "мужской" : "женский"}</dd>
            </div>
          </dl>
        </div>
        <div className="lk__block lk__block--contacts">
          <h2 className="title lk__block-title">Контактные данные</h2>
          <dl className="lk__block-list">
            <div>
              <dt>Страна</dt>
              <dd>{profile.country.name}</dd>
            </div>
            {profile?.region && (
              <div>
                <dt>Регион</dt>
                <dd>{profile.region.name}</dd>
              </div>
            )}
            <div>
              <dt>Населенный пункт</dt>
              <dd>{profile.city.name}</dd>
            </div>
            <div>
              <dt>Адрес</dt>
              <dd>{`${profile.street}, ${profile?.houseNumber}`}</dd>
            </div>
            <div>
              <dt>Мобильный телефон</dt>
              <dd>{profile.phone}</dd>
            </div>
            <div>
              <dt>Электронная почта</dt>
              <dd>{profile.email}</dd>
            </div>
          </dl>
          <button
            className="btn btn--empty lk__block-btn"
            onClick={handleChangeUserData}
          >
            Изменить данные
          </button>
        </div>
        <div className="lk__block lk__block--password">
          <button
            className="btn btn--empty lk__block-btn"
            onClick={handleChangePassword}
          >
            Изменить пароль
          </button>
        </div>
        <article className="lk__mentor">
          <h3 className="title lk__mentor-title">Наставник</h3>
          {isEmpty(profile.mentor) ? (
            <span className="lk__mentor-link">Отсутствует</span>
          ) : (
            <>
              <span className="lk__mentor-link">
                {`${profile.mentor.lastName} ${profile.mentor.name}`}
              </span>
              <p className="lk__mentor-id">
                ID <b>{profile?.mentor.referralId}</b>
              </p>
            </>
          )}
        </article>

        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          setIsOpen={setChangePasswordOpen}
        />
        <UserUpsetModal
          isOpen={isChangeUserDataOpen}
          setIsOpen={handleChangeUserData}
          profile={profile}
          userId={id}
        />
      </div>
      {coaplicantData?(
        <div className="lk__block lk__block--personal-data">
        <h2 className="title lk__block-title">Данные коаппликанта</h2>
        <dl className="lk__block-list">
          <div>
            <dt>Фамилия</dt>
            <dd>{coaplicantData?.lastName}</dd>
          </div>
          <div>
            <dt>Имя</dt>
            <dd>{coaplicantData?.firstName}</dd>
          </div>
          <div>
            <dt>Отчество</dt>
            <dd>{coaplicantData?.patronymic}</dd>
          </div>
          <div>
            <dt>Дата рождения</dt>
            <dd>{coaplicantData?.dateOfBirth}</dd>
          </div>
          <div>
            <dt>Телефоны</dt>
            <dd>{coaplicantData?.phone}</dd>
          </div>
        </dl>
      </div>
      ):(
        <CoApplicantData />
      )
    }
    </>
  );
};
