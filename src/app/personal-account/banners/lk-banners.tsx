export const PersonalAccountBanners = () => {
  return (
    <div className="lk-menu__banners">
      <div className="lk-menu__banner lk-menu__banner--green">
        <h3 className="title title--sm lk-menu__banner-title">START 2024</h3>
        <picture className="lk-menu__banner-img">
          <source srcSet="/images/lk_banner_1.jpg, /images/lk_banner_1@2x.jpg 2x" />
          <img src="/images/lk_banner_1.jpg" alt="" />
        </picture>
      </div>
      <div className="lk-menu__banner">
        <h3 className="title title--sm lk-menu__banner-title">
          Воркшоп от Лидеров
        </h3>
        <picture className="lk-menu__banner-img">
          <source srcSet="/images/lk_banner_2.jpg, /images/lk_banner_2@2x.jpg 2x" />
          <img src="/images/lk_banner_2.jpg" alt="" />
        </picture>
      </div>
    </div>
  );
};
