import { useFetchGroupTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";
import CountdownTimer from "./final-date-dara";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface IFinalDateProps {
  referralId: string;
}

export const FinalDate = ({ referralId }: IFinalDateProps) => {
const currentDate = new Date();
const monthName = format(currentDate, 'MMMM yyyy', { locale: ru }); 

  const { data: groupTradeTurnover } =
    useFetchGroupTradeTurnoverQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h3>
      <span> До конца текущего периода </span>
      <div className="business_data">
        <CountdownTimer />
      </div>
      {/* <b>{`${groupTradeTurnover} PV`}</b> */}
    </article>
  );
};
