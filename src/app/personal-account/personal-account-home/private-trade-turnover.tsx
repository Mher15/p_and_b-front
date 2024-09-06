import { useFetchPrivateTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";

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
    role:string
  }
}
export const PrivateTradeTurnover = ({
  referralId,office
}: Props) => {
  const { data: privateTradeTurnover } =
    useFetchPrivateTradeTurnoverQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Мой бизнес</h3>
      <div className="business_data">
        <div>
          <span className="business_data_box">ЛО</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">{office?.lo}</span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">ГО</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">{office?.go}</span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">ОТ</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">{office?.ot}</span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">Квалификация</span>
          <div className="line"></div>
          <span className="last_span">{office?.role}</span>
        </div>
      </div>
      {/* <b>{`${privateTradeTurnover} PV`}</b> */}
    </article>
  );
};
