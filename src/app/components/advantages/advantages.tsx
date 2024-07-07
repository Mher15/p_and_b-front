import { translate } from "../../translation";
import { useAppSelector } from "../../hooks";

export const Advantages = () => {
  const locale = useAppSelector((state) => state.profile.locale);

  return (
    <div className="info-section">
      <div className="container">
        <ul className="info-section__list">
          <li className="info-section__item">
            {translate("aboutBanner.innovative", locale)}
            {translate("aboutBanner.productionTechnologies", locale)}
          </li>
          <li className="info-section__item">
            Умные продукты для вашего здоровья
          </li>
          <li className="info-section__item">
            Максимальные выплаты партнёрам индустрии
          </li>
          <li className="info-section__item">
            Амбициозное сообщество продвинутых людей
          </li>
        </ul>
      </div>
      <picture className="info-section__banner">
        <source
          srcSet="/images/info-bg.jpg, /images/info-bg@2x.jpg 2x"
          media="(min-width: 576px)"
        />
        <source
          srcSet="/images/info-bg-sm.jpg, /images/info-bg-sm@2x.jpg 2x"
          media="(max-width: 576px)"
        />
        <img src="/images/info-bg.jpg" alt="" />
      </picture>
    </div>
  );
};
