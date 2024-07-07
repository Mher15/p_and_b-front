import WarningIcon from "../../../../public/images/icons/warning-icon.svg";
import ArrowDown from "../../../../public/images/icons/arrow-down.svg";

export const StatementHeader = () => {
  return (
    <div className="lk__statement-header">
      <div className="main-info">
        <div className="period">
          <div className="period-date">
            Период։ Апрель 2024
            <img src={ArrowDown} alt="icon" />
          </div>
          <div className="advance-payment">
            <img src={WarningIcon} alt="warningIcon" />
            <span>Предварительный расчет</span>
          </div>
        </div>
        <div className="status">
          <div>
            <p>
              Квалификация <span>Master</span>
            </p>
            <small>(текущий месяц)</small>
          </div>
          <div>
            <p>
              Статус <span>Manager</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
