import WarningIcon from "../../../../public/images/icons/warning-icon.svg";
import ArrowDown from "../../../../public/images/icons/arrow-down.svg";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const StatementHeader = () => {
  const currentDate = new Date();
const monthName = format(currentDate, 'MMMM yyyy', { locale: ru }); 
  return (
    <div className="lk__statement-header">
      <div className="main-info">
        <div className="period">
          <div className="period-date">
            Период։ {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
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
