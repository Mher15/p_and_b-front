import styled from "styled-components";
import { useFetchMentorBonusQuery } from "../../../features/api/personal-account-api-slice";

interface IMentorBonusProps {
  referralId: string;
}

const MentorBonusContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const MentorBonus = ({ referralId }: IMentorBonusProps) => {
  const { data: partnerCount } = useFetchMentorBonusQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Счет вознаграждения</h3>
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
      {/* <MentorBonusContent>
        <h4 className="title title--sm">Партнёров: </h4>
        <b>{`${partnerCount}`}</b>
      </MentorBonusContent> */}
    </article>
  );
};
