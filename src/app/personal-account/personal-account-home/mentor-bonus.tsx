import styled from "styled-components";

interface IMentorBonusProps {
  referralId: string;
  gift:any
  finance:any
}

const MentorBonusContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const MentorBonus = ({ referralId,gift,finance }: IMentorBonusProps) => {

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Мои счета</h3>
      <div className="business_data">
        <div>
          <span className="business_data_box">Счет вознаграждения</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">{finance?.availableRewardAccount ? finance?.availableRewardAccount : 0}</span>
            <span>₽</span>
          </div>
        </div>
        <div>
          <span className="business_data_box">Gift (подарочный счет)</span>
          <div className="line"></div>
          <div className="business_data_box_text">
            <span className="count">{finance?.availableGift ? finance?.availableGift : 0} </span>
            <span>₽</span>
          </div>
        </div>
      </div>
      {/* <MentorBonusContent>
        <h4 className="title title--sm">Партнёров: </h4>
        <b>{`${partnerCount}`}</b>
      </MentorBonusContent> */}
    </article>
  );
};
