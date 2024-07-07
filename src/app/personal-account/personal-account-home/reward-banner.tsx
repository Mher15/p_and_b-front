import styled from "styled-components";
import { useFetchMarketingQuery } from "../../../features/api/marketing-api-slice";

const RewardBannerContainer = styled.div`
  cursor: pointer;
`;

export const RewardBanner = () => {
  const { data: marketing } = useFetchMarketingQuery();

  const onRewardBannerClick = () => {
    if (!marketing) return;

    window.open(`/static/${marketing.file}`, "_blank");
  };

  return (
    marketing && (
      <RewardBannerContainer>
        <div className="lk__reward-banner" onClick={onRewardBannerClick}>
          <h3 className="title title--sm lk__reward-title">
            <a href="#">Система вознаграждения для партнеров B&P</a>
          </h3>
          <picture>
            <source srcSet="/images/reward_banner.png, /images/reward_banner@2x.png 2x" />
            <img src="/images/reward_banner.png" alt="" />
          </picture>
        </div>
      </RewardBannerContainer>
    )
  );
};
