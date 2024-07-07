import { IPersonalAccountPartner } from "../../types";

interface IPersonalAccountPartnerProps {
  partner: IPersonalAccountPartner;
}
export const PersonalAccountPartner = ({
  partner,
}: IPersonalAccountPartnerProps) => {
  return (
    <tr className="lk__table-item">
      <td className="lk__table-profile">
        <p>{`${partner.lastName} ${partner.name}`}</p>
        <span>{`ID: ${partner.referralId}`}</span>
      </td>
      <td>{partner.privateTradeTurnover}</td>
      <td>{partner.groupTradeTurnover}</td>
      <td className="lk__table-profile">
        <p>{`${partner.mentor.lastName} ${partner.mentor.name}`}</p>
        <span>{`ID: ${partner.mentor.referralId}`}</span>
      </td>
      <td className="lk__table-fav-wrapper">
        <button
          className={`btn--reset togglable lk__table-fav ${
            partner.isAmbassador ? "active" : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.0008 17.75L5.82881 20.995L7.00781 14.122L2.00781 9.25495L8.90781 8.25495L11.9938 2.00195L15.0798 8.25495L21.9798 9.25495L16.9798 14.122L18.1588 20.995L12.0008 17.75Z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
