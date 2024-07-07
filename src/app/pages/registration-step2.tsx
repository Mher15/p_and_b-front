import { Link, useNavigate, useParams } from "react-router-dom";
import { appRoutes, roleTranslationMap } from "../constants";
import { Breadcrumbs } from "../components/breadcrumbs";
import { useAppSelector } from "../hooks";
import { translate } from "../translation";
import { useGetMentorByLinkQuery } from "../../features/api/user-api-slice";
import { Loader } from "../components/loader";

export const RegistrationStep2 = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { mentor: mentorUrl } = useParams();
  const navigate = useNavigate();
  const { data: mentorLink } = useGetMentorByLinkQuery(String(mentorUrl));
  if (!mentorUrl) {
    return navigate(`${appRoutes.HOME}`);
  }
  if (!mentorLink?.link) return <Loader />;

  const { link } = mentorLink;

  return (
    <main className="main partner-reg partner-reg--second">
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
          <div className="partner-reg__text-content">
            <b>Внимание!</b> Прежде чем «Продолжить», внимательно прочтите
            информацию, представленную ниже.
          </div>
          <div className="partner-reg__block">
            В соответствии со Стандартами и процедурами B&P человек может иметь
            один действующий контракт с компанией. <br />
            Человек может иметь одно Соглашение о партнерстве. Если у кандидата
            уже есть действующий контракт - зарегистрировать новое соглашение он
            может только, аннулировав прежнее, то есть через 6 месяцев
            неактивности. При обнаружении нарушений второй контракт
            аннулируется. При этом, если менеджер не хочет продолжать работу на
            первом договоре, зарегистрировать новое соглашение он сможет не
            ранее, чем через год.
          </div>
          <div className="partner-reg__block partner-reg__block--list">
            <ul className="components__list full">
              <li>
                При желании зарегистрировать Соглашение о семейном партнерстве -
                вы сможете это сделать после индивидуальной регистрации.
              </li>
              <li>
                Супруги могут иметь индивидуальные контракты. При этом их
                контракты должны быть зарегистрированы под одним наставником или
                друг под другом.
              </li>
            </ul>
          </div>
          <div className="partner-reg__block">
            <b>СТАРТОВЫЙ ПЕРИОД</b>: до конца текущего месяца + следующий.{" "}
            <br />
            После регистрации вы вступаете в стартовый период. За это время вам
            нужно активировать свой контракт - то есть сделать (не суммарно, а в
            один из стартовых месяцев) личный объем не менее 60 PV. Если объем
            60 PV не выполнен - Соглашение о партнерстве аннулируется по
            истечении стартового периода.
          </div>
          <Link to={`${appRoutes.REGISTRATION}/${link?.name}/3`}>
            <button className="btn btn--lg partner-reg__btn">
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};
