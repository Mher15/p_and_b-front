import { useFetchGroupTradeTurnoverQuery } from "../../../features/api/personal-account-api-slice";

interface IFinalDateProps {
  referralId: string;
}

export const FinalDate = ({
  referralId,
}: IFinalDateProps) => {
  const { data: groupTradeTurnover } = useFetchGroupTradeTurnoverQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Апрель 2024</h3>
      <span> До конца текущего периода </span>
      <div className="business_data">
        
      </div>
      {/* <b>{`${groupTradeTurnover} PV`}</b> */}
    </article>
  );
};
