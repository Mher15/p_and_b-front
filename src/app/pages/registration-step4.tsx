import { Link, useNavigate, useParams } from "react-router-dom";
import { appRoutes, roleTranslationMap } from "../constants";
import { Breadcrumbs } from "../components/breadcrumbs";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRegistrationMutation } from "../../features/api/auth-api-slice";
import { Loader } from "../components/loader/loader";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../features/profile/profile-slice";
import {
  IQueryResponse,
  IRegistrationData,
  IRegistrationResponse,
  IUser,
} from "../types";
import { translate } from "../translation";
import { useGetMentorByLinkQuery } from "../../features/api/user-api-slice";
import { setUserData } from "../../features/registration/registration-slice";
import { notification } from "antd";

export const RegistrationStep4 = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const { mentor: mentorUrl } = useParams();
  const navigate = useNavigate();
  const { data: mentorLink } = useGetMentorByLinkQuery(String(mentorUrl));
  const userData = useAppSelector((state) => state.registration.userData);
  const [registrate] = useRegistrationMutation();

  if (!mentorUrl) {
    return navigate(`${appRoutes.HOME}`);
  }

  if (!mentorLink?.mentor || !mentorLink?.link) return <Loader />;

  const { mentor, link } = mentorLink;

  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotification = (description: string) => {
    api.error({
      message: "Пользователь ",
      description,
      placement: "bottomRight",
    });
  };

  const handleRegistration = () => {
    if (!userData) return;

    const registrationData: IRegistrationData = {
      ...userData,
      countryId: userData.country.id,
      cityId: userData.city.id,
      regionId: userData.region?.id || 0,
      mentor: userData.mentor.referralId,
      role: link.role,
    };

    registrate(registrationData).then(
      (response: IQueryResponse<IRegistrationResponse>) => {
        const { data, error } = response;
        if (error) {
          const { data: errorData } = error;

          if (errorData.message === "User with this phone already exists") {
            openNotification("с таким телефоном уже зарегистрирован");
          }
          if (errorData.message === "User with this email already exists") {
            openNotification("с таким email уже зарегистрирован");
          }
        } else {
          if (!data) {
            throw new Error(`Registration failed: data is undefined`);
          }
          const { token } = data;
          localStorage.setItem("token", token);
          const user: IUser = jwtDecode(token);
          dispatch(setUser(user));
          dispatch(setUserData({ ...userData }));
          navigate(`${appRoutes.REGISTRATION}/${link?.name}/5`);
        }
      }
    );
  };

  return (
    <main className="main partner-reg partner-reg--fourth">
      <Breadcrumbs />
      <section className="partner-reg__section">
        <div className="container">
          <h1 className="title partner-reg__main-title">
            {`${translate(
              "registration.step3.registration",
              locale
            )} ${translate(roleTranslationMap[link.role], locale)} ${translate(
              "registration.step3.BP",
              locale
            )}`}
          </h1>
          <div className="partner-reg__results">
            <h2 className="title partner-reg__title">
              Проверьте регистрационные данные
            </h2>
            <dl className="partner-reg__descr-list">
              <div>
                <dt>{translate("common.mentor", locale)}</dt>
                <dd>
                  {`${mentor.lastName} ${mentor.name}`}
                  <b
                    style={{ whiteSpace: "nowrap" }}
                  >{` (id: ${mentor.referralId})`}</b>
                </dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.registrationDate", locale)}
                </dt>
                <dd>{moment().format("DD.MM.YYYY")}</dd>
              </div>
            </dl>
            <h3 className="title title--sm partner-reg__title">
              {translate("registration.step3.personalData", locale)}
            </h3>
            <dl className="partner-reg__descr-list">
              <div>
                <dt>
                  {translate("registration.step3.form.lastName.label", locale)}
                </dt>
                <dd>{userData?.lastName}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.name.label", locale)}
                </dt>
                <dd>{userData?.name}</dd>
              </div>
              <div>
                <dt>
                  {translate(
                    "registration.step3.form.patronymic.label",
                    locale
                  )}
                </dt>
                <dd>{userData?.patronymic}</dd>
              </div>
              <div>
                <dt>
                  {translate(
                    "registration.step3.form.dateOfBirth.label",
                    locale
                  )}
                </dt>
                <dd>{userData?.dateOfBirth}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.gender.label", locale)}
                </dt>
                <dd>
                  {userData?.gender === "male"
                    ? translate("registration.step3.form.gender.male", locale)
                    : translate(
                        "registration.step3.form.gender.female",
                        locale
                      )}
                </dd>
              </div>
            </dl>
            <h3 className="title title--sm partner-reg__title">
              {translate("registration.step3.contactDetails", locale)}
            </h3>
            <dl className="partner-reg__descr-list">
              <div>
                <dt>
                  {translate("registration.step3.form.country.label", locale)}
                </dt>
                <dd>{userData?.country?.name}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.city.label", locale)}
                </dt>
                <dd>{userData?.city?.name}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.region.label", locale)}
                </dt>
                <dd>{userData?.region?.name}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.street.label", locale)}
                </dt>
                <dd>{userData?.street}</dd>
                <dt>
                  {translate(
                    "registration.step3.form.houseNumber.label",
                    locale
                  )}
                </dt>
                <dd>{userData?.houseNumber}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.phone.label", locale)}
                </dt>
                <dd>{userData?.phone}</dd>
              </div>
              <div>
                <dt>
                  {translate("registration.step3.form.email.label", locale)}
                </dt>
                <dd>{userData?.email}</dd>
              </div>
            </dl>
          </div>
          <div className="partner-reg__controls-bottom">
            <Link to={`${appRoutes.REGISTRATION}/${link?.name}/3`}>
              <button className="btn btn--empty btn--lg partner-reg__btn-prev">
                {translate("common.prev", locale)}
              </button>
            </Link>
            <button
              className="btn btn--lg partner-reg__btn-next"
              onClick={handleRegistration}
            >
              {translate("common.next", locale)}
            </button>
          </div>
        </div>
        {contextHolder}
      </section>
    </main>
  );
};
