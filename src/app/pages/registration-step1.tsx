import { Link, useNavigate, useParams } from "react-router-dom";
import { appRoutes, roleTranslationMap } from "../constants";
import { Breadcrumbs } from "../components/breadcrumbs";
import { translate } from "../translation";
import { useAppSelector } from "../hooks";
import { useGetMentorByLinkQuery } from "../../features/api/user-api-slice";
import { Loader } from "../components/loader";

export const RegistrationStep1 = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { mentor: mentorUrl } = useParams();
  const navigate = useNavigate();
  const { data: mentorLink } = useGetMentorByLinkQuery(String(mentorUrl));
  if (!mentorUrl) {
    return navigate(`${appRoutes.HOME}`);
  }

  if (!mentorLink) return <Loader />;

  const { mentor, link } = mentorLink;

  return (
    <main className="main partner-reg">
      <Breadcrumbs />
      <section className="partner-reg__section">
        <div className="container">
          <h1 className="title partner-reg__main-title">
            {`${translate("registration.step1.registration", locale)} ${
              link.role ? translate(roleTranslationMap[link.role], locale) : ""
            }`}
          </h1>
          <div
            className="partner-reg__text-content"
            style={{ whiteSpace: "nowrap" }}
          >
            Вы можете зарегистрировать <br />
            Соглашение о партнерстве с компанией BEST & PEOPLE <br />в
            организации наставника {`${mentor.lastName} ${mentor.name}`}
            <b>{` (id: ${mentor.referralId})`}</b>
          </div>
          <Link to={`${appRoutes.REGISTRATION}/${link.name}/2`}>
            <button className="btn btn--lg partner-reg__btn">
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
