import StarIcon from "../../../../public/images/icons/star.svg";
import WarningIcon from "../../../../public/images/icons/warning-icon.svg";

export const StatementFinances = () => {
  return (
    <div className="main-finances">
        <div className="ambassador">
          <div className="white-block">
            <p>60</p>
            <hr />
            <p>--</p>
            <img src={StarIcon} alt="star" />
          </div>
          <div className="statement-block-title">
            <p>Амбассадор</p>
            <img src={WarningIcon} alt="warning icon" />
          </div>
          <div className="white-block">
            <p>200</p>
            <hr />
            <p>--</p>
            <img src={StarIcon} alt="star" />
          </div>
        </div>
      <div className="statement-finances">
        <div className="statement-finances-header">Финансы</div>
        <div className="finance-blocks">
          <div>
            <div>Gift (Подарочный счет)</div>
            <div>13 720 ₽</div>
          </div>
          <div>
            <div>Счет возногрождений</div>
            <div>36 678 ₽</div>
          </div>
          <div>
            <div>С начала 2024</div>
            <div>453 720 ₽</div>
          </div>
          <div>
            <div>Всего в Best & People</div>
            <div>10 237 678 ₽</div>
          </div>
        </div>
      </div>

    </div>
  );
};
