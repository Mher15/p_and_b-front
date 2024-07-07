import { useFetchAuthorBonusQuery } from "../../../features/api/personal-account-api-slice";

interface IAuthorBonusProps {
  referralId: string;
}

export const AuthorBonus = ({ referralId }: IAuthorBonusProps) => {
  const { data: authorBonus } = useFetchAuthorBonusQuery(referralId);

  return (
    <article className="lk__stats-item">
      <h3 className="title title--sm">Авторский Гонорар</h3>
      <b>{`${authorBonus} PV`}</b>
    </article>
  );
};
