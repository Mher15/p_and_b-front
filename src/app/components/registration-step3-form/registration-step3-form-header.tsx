import { translate } from "../../translation";
import { IMentorDto, IReferralLink } from "../../types";
import moment from "moment";
import { userRoles } from "../../constants";

interface IRegistrationStep3FormHeaderProps {
  locale: string;
  mentorDto: IMentorDto;
  link: IReferralLink;
}
const { CLIENT, PARTNER } = userRoles;

const translationMap = {
  [CLIENT]: "registration.step3.clint",
  [PARTNER]: "registration.step3.partner",
};

export const RegistrationStep3FormHeader = ({
  link,
  mentorDto,
  locale,
}: IRegistrationStep3FormHeaderProps) => {
  return (
    <>
      <h1 className="title partner-reg__main-title">
        {`${translate("registration.step3.registration", locale)} ${translate(
          translationMap[link.role],
          locale
        )} ${translate("registration.step3.BP", locale)}`}
      </h1>
      <div className="partner-reg__text-content">
        {translate("registration.step3.description", locale)}
      </div>
      <div className="partner-reg__block">
        <b>{translate("common.attention", locale)}</b>{" "}
        {translate("registration.step3.attention", locale)}
      </div>
      <h2 className="title partner-reg__title">
        {translate("registration.step3.description2", locale)}
      </h2>
      <div className="partner-reg__descr-list">
        <div>
          <dt>{translate("common.mentor", locale)}</dt>
          <dd style={{ whiteSpace: "nowrap" }}>
            {`${mentorDto?.lastName} ${mentorDto?.name}`}
            <b>{` (id: ${mentorDto?.referralId})`}</b>
          </dd>
        </div>
        <div>
          <dt>{translate("registration.step3.registrationDate", locale)}</dt>
          <dd>{moment().format("DD.MM.YYYY")}</dd>
        </div>
      </div>
    </>
  );
};
