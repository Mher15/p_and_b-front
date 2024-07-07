import { useFetchGroupTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";

interface IGroupTradeTurnoverProps {
  referralId: string;
}

export const GroupTradeTurnover = ({
  referralId,
}: IGroupTradeTurnoverProps) => {
  const { data: groupTradeTurnover } =
    useFetchGroupTradeTurnoverQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Моя структура</h3>
      <div className="business_data">
        <div>
          <span className="business_data_box">Всего Партнеров</span>
          <div className="line"></div>
            <span className="count">2 378</span>
        </div>
        <div>
          <span className="business_data_box">Активных Партнеров</span>
          <div className="line"></div>
            <span className="count">2 178</span>
        </div>
        <div>
          <span className="business_data_box">Всего в первой линии</span>
          <div className="line"></div>
            <span className="count">96</span>
        </div>
        <div>
          <span className="business_data_box">Новых в первой линии</span>
          <div className="line"></div>
          <span className="count">18</span>
        </div>
        <div>
          <span className="business_data_box">Новых в структуре</span>
          <div className="line"></div>
          <span className="count">278</span>
        </div>
      </div>
      {/* <b>{`${groupTradeTurnover} PV`}</b> */}
    </article>
  );
};
