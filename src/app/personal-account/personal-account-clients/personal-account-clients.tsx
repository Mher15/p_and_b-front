import { useFetchClientsQuery } from "../../../features/api/personal-account-api-slice";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { PersonalAccountClient } from "./personal-account-client";

export const PersonalAccountClients = () => {
  const user = useAppSelector((state) => state.profile.user);
  const referralId = user?.referralId || "0";
  const { data: clients = [] } = useFetchClientsQuery(referralId);
  if (!user) return <NotFound />;
  return (
    <div className="lk__wrapper lk__wrapper-tabs-first">
      <div className="lk__tabs-contents">
        <div className="lk__tabs-content active">
          <div className="lk__info-table">
            <div className="lk__table-wrapper">
              <table className="lk__table">
                <thead>
                  <tr className="lk__table-item">
                    <th>Клиент</th>
                    <th>Дата регистрации </th>
                    <th>Почта </th>
                    <th>Телефон </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <PersonalAccountClient
                      key={client.referralId}
                      client={client}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
