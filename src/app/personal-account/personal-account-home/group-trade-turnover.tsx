import { useFetchGroupTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";

interface Props {
  referralId: string;
  office:{
    lo:number,
    go:number,
    ot:number,
    activePartners:number
    myNewRefers:number
    myRefers:number
    newRefers:number
    totalPartners:number
  }
}

export const GroupTradeTurnover = ({
  referralId,office
}: Props) => {
  const { data: groupTradeTurnover } =
    useFetchGroupTradeTurnoverQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Моя структура</h3>
      <div className="business_data">
        <div>
          <span className="business_data_box">Всего Партнеров</span>
          <div className="line"></div>
            <span className="count">{office?.totalPartners ? office?.totalPartners
 : 0}</span>
        </div>
        <div>
          <span className="business_data_box">Активных Партнеров</span>
          <div className="line"></div>
            <span className="count">{office?.activePartners ? office?.activePartners
 : 0}</span>
        </div>
        <div>
          <span className="business_data_box">Всего в первой линии</span>
          <div className="line"></div>
            <span className="count">{office?.myRefers ? office?.myRefers
: 0}</span>
        </div>
        <div>
          <span className="business_data_box">Новых в первой линии</span>
          <div className="line"></div>
          <span className="count">{office?.myNewRefers ? office?.myNewRefers
 : 0}</span>
        </div>
        <div>
          <span className="business_data_box">Новых в структуре</span>
          <div className="line"></div>
          <span className="count">{office?.newRefers ? office?.newRefers
 : 0}</span>
        </div>
      </div>
      {/* <b>{`${groupTradeTurnover} PV`}</b> */}
    </article>
  );
};
