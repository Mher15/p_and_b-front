import { IPersonalAccountClient } from "../../types";

interface IPersonalAccountClientProps {
  client: IPersonalAccountClient;
}
export const PersonalAccountClient = ({
  client,
}: IPersonalAccountClientProps) => {
  return (
    <tr className="lk__table-item">
      <td className="lk__table-profile">
        <p>{`${client.lastName} ${client.name}`}</p>
        <span>{`ID: ${client.referralId}`}</span>
      </td>
      <td>{client.privateTradeTurnover}</td>
      <td className="lk__table-profile">
        <p>{`${client.mentor.lastName} ${client.mentor.name}`}</p>
        <span>{`ID: ${client.mentor.referralId}`}</span>
      </td>
      <td className="lk__table-fav-wrapper">
        <button className="btn--reset togglable lk__table-fav">
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
