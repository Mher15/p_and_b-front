import { Link } from "react-router-dom";
// import { useFetchClientsQuery } from "../../../features/api/personal-account-api-slice";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { financeAccountRoutes } from "../data/constants";
import { useFetchOrdersQuery } from "../../../features/api/order-api-slice";

export const PersonalAccountFinance = () => {
  const user = useAppSelector((state) => state.profile.user);
  // const referralId = user?.referralId || "0";
  // const { data: clients = [] } = useFetchClientsQuery(referralId);
  if (!user) return <NotFound />
  

  return (
    <div className="lk__small_blocks_parent">
      <Link to={`/personal-account/finance/${financeAccountRoutes.FINANCE_BALANCE}`}>
        <article className="lk__small_blocks">
          <span>Мои счета</span>
          <img src="/favicon-32x32.png" alt="" />
        </article>
      </Link>
      <Link
        to={`/personal-account/finance/${financeAccountRoutes.FINANCE_TRANSACTIONS}`}
      >
        <article className="lk__small_blocks">
          <span>Перевод средств</span>
          <img src="/favicon-32x32.png" alt="" />
        </article>
      </Link>
      <Link to={`/personal-account/finance/${financeAccountRoutes.FINANCE_PAYMENTS}`}>
        <article className="lk__small_blocks">
          <span>Выплаты</span>
          <img src="/favicon-32x32.png" alt="" />
        </article>
      </Link>
      {/* <GiftAccountInfo />
            <CashbackAccountInfo /> */}
    </div>
  );
};
