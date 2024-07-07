import { Link, useNavigate, useParams } from "react-router-dom";
import { appRoutes, roleTranslationMap } from "../constants";
import { useAppSelector } from "../hooks";
import { Breadcrumbs } from "../components/breadcrumbs";
import { translate } from "../translation";
import { Loader } from "../components/loader";
import { useGetMentorByLinkQuery } from "../../features/api/user-api-slice";

export const RegistrationStep5 = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const { mentor: mentorUrl } = useParams();
  const navigate = useNavigate();
  const { data: mentorLink } = useGetMentorByLinkQuery(String(mentorUrl));
  const userData = useAppSelector((state) => state.registration.userData);

  if (!mentorUrl) {
    return navigate(`${appRoutes.HOME}`);
  }

  if (
    !mentorLink?.mentor ||
    !mentorLink?.link ||
    !user?.referralId ||
    !userData?.email
  )
    return <Loader />;

  const { link } = mentorLink;
  const { referralId } = user;
  const { email } = userData;

  return (
    <main className="main partner-reg partner-reg--fifth">
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
          <h2 className="title partner-reg__title">Поздравляем!</h2>
          <div className="partner-reg__text-content">
            Регистрация партнера прошла успешно! <br />
            На электронный адрес, указанный при регистрации, отправлено
            сообщение с данными для доступа в личный кабинет. <br /> <br />
            <b>Ваш ID: {referralId}</b> <br />
            <b>Ваш пароль выслан на указанную при регистрации почту: {email}</b>
          </div>

          <Link to={appRoutes.PERSONAL_ACCOUNT}>
            <button className="btn btn--lg partner-reg__btn partner-reg__btn--lk">
              Войти в личный кабинет
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
