import styled from "styled-components";
import { useGetOrCreateLinkMutation } from "../../../features/api/referral-links-api-slice";
import { getRegistrationLink } from "../../../utils";
import { userRoles } from "../../constants";
import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";
import { IReferralLink, ResponseType } from "../../types";
import { message } from "antd";

const { CLIENT, PARTNER } = userRoles;

const successTranslateMap = {
  [CLIENT]: "referalLinks.copy.client.success",
  [PARTNER]: "referalLinks.copy.partner.success",
};

const SuccessIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url("/images/icons/checkmark-full.svg") center center / contain
    no-repeat;
`;

export const ReferralLinks = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const origin = window.location.origin;
  const [getLink] = useGetOrCreateLinkMutation();
  const [messageApi, contextHolder] = message.useMessage();

  if (!user) {
    throw new Error("User mast present");
  }

  const showSuccessMessage = (role: string) => {
    messageApi.open({
      type: "success",
      content: translate(successTranslateMap[role], locale),
    });
  };

  const showErrorMessage = () => {
    messageApi.open({
      type: "error",
      content: translate("referalLinks.copy.erorr", locale),
      icon: <SuccessIcon />,
    });
  };

  const clientLinkCopiedSuccess = () => {
    showSuccessMessage(CLIENT);
  };

  const partnerLinkCopiedSuccess = () => {
    showSuccessMessage(PARTNER);
  };

  const linkCopiedError = () => {
    showErrorMessage();
  };

  const handlePartnerLinkCopy = () => {
    const linkDto = {
      referralId: user.referralId,
      role: userRoles.PARTNER,
    };

    getLink(linkDto).then((response: ResponseType<IReferralLink>) => {
      const link = getRegistrationLink(origin, response.data);

      navigator.clipboard
        .writeText(link)
        .then(partnerLinkCopiedSuccess, linkCopiedError);
    });
  };

  const handleClientLinkCopy = () => {
    const linkDto = {
      referralId: user.referralId,
      role: userRoles.CLIENT,
    };

    getLink(linkDto).then(({ data: linkName }) => {
      const link = getRegistrationLink(origin, linkName);

      navigator.clipboard
        .writeText(link)
        .then(clientLinkCopiedSuccess, linkCopiedError);
    });
  };

  return (
    <div className="lk__wrapper">
      {contextHolder}
      <article
        className="lk__referal"
        data-copy-text="true"
        onClick={handlePartnerLinkCopy}
      >
        <h2 className="title title--sm">Регистрация новых бизнес-партнеров</h2>
        <p className="lk__referal-link">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.268C19.304 8.44353 19.5565 8.696 19.732 9.00003C19.9076 9.30406 20 9.64894 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H13M5.003 15.734C4.69812 15.5587 4.44486 15.3061 4.26876 15.0016C4.09266 14.6972 3.99996 14.3517 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H11"
              stroke="#B3DB11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{translate("common.copyLink", locale)}</span>
        </p>
      </article>
      <article
        className="lk__referal"
        data-copy-text="true"
        onClick={handleClientLinkCopy}
      >
        <h2 className="title title--sm">
          {translate("referalLinks.title", locale)}
        </h2>
        <p className="lk__referal-link">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.268C19.304 8.44353 19.5565 8.696 19.732 9.00003C19.9076 9.30406 20 9.64894 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H13M5.003 15.734C4.69812 15.5587 4.44486 15.3061 4.26876 15.0016C4.09266 14.6972 3.99996 14.3517 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H11"
              stroke="#B3DB11"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{translate("common.copyLink", locale)}</span>
        </p>
      </article>
    </div>
  );
};
