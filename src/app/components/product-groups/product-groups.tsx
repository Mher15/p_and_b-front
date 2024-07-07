import { useAppSelector } from "../../hooks";
import { getProductsCountByGroup, getProductsTranslate } from "../../../utils";
import { useFetchProductsQuery } from "../../../features/api/products-api-slice";
import { useFetchGroupsQuery } from "../../../features/api/groups-api-slice";
import { Loader } from "../loader/loader";
import { MainBanner } from "../main-banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { appRoutes } from "../../constants";

const navigation = {
  nextEl: ".hero__products .components__arrow--next",
  prevEl: ".hero__products .components__arrow--prev",
};

const pagination = {
  el: ".hero__products .components__pagination",
  clickable: true,
};

const breakpoints = {
  300: {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: false,
    pagination,
    loop: false,
  },
  992: {
    slidesPerView: 4,
    spaceBetween: 24,
    navigation: {
      nextEl: ".hero__products .components__arrow--next",
      prevEl: ".hero__products .components__arrow--prev",
    },
    loop: true,
  },
  1200: {
    pagination: false,
    slidesPerView: 5,
    spaceBetween: 24,
  },
};

export const ProductGroups = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: products = [], isLoading: isProductsLoading } =
    useFetchProductsQuery();
  const { data: groups = [], isLoading: isGroupsLoading } =
    useFetchGroupsQuery();
  const productsCountByGroup = getProductsCountByGroup(products, groups);

  const isLoading = isProductsLoading || isGroupsLoading;

  if (isLoading) return <Loader />;

  return (
    <section className="hero">
      <h1 className="sr-only">Главный заголовок главной страницы</h1>
      <MainBanner />
      <div className="hero__products">
        <div className="container">
          <div className="swiper hero__products-list">
            <Swiper
              modules={[Navigation, Pagination]}
              speed={800}
              navigation={navigation}
              pagination={pagination}
              loop={true}
              breakpoints={breakpoints}
            >
              <div className="swiper-wrapper">
                {groups.map((group) => (
                  <SwiperSlide key={group.id}>
                    <article
                      key={group.id}
                      className="swiper-slide hero__product"
                    >
                      <div className="hero__product-icon">
                        <img
                          src={`/static/${group.image}`}
                          alt={group.description || ""}
                        />
                      </div>
                      <h2 className="hero__product-title">
                        <Link to={`${appRoutes.CATALOG}?group=${group.name}`}>
                          {group.name}
                        </Link>
                      </h2>
                      <p>{`${
                        productsCountByGroup[group.id]
                      } ${getProductsTranslate(
                        productsCountByGroup[group.id],
                        locale
                      )}`}</p>
                    </article>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
        <button className="btn--reset components__arrow components__arrow--prev">
          <img src="/images/icons/arrow-prev.svg" alt="" />
        </button>
        <button className="btn--reset components__arrow components__arrow--next">
          <img src="/images/icons/arrow-prev.svg" alt="" />
        </button>
        <div className="components__pagination"></div>
      </div>
    </section>
  );
};
