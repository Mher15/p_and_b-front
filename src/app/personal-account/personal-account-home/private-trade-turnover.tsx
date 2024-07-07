import { useFetchPrivateTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";

interface IPrivateTradeTurnoverProps {
  referralId: string;
}
export const PrivateTradeTurnover = ({
  referralId,
}: IPrivateTradeTurnoverProps) => {
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
            <span className="count">2 500 </span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">ГО</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">7 896 </span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">ОТ</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">287 930 </span>
            <span>VP</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">Квалификация</span>
          <div className="line"></div>
          <span className="last_span">Pr T</span>
        </div>
      </div>
      {/* <b>{`${privateTradeTurnover} PV`}</b> */}
    </article>
  );
};
