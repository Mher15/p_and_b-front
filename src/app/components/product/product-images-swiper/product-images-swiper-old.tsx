import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperClass from "swiper/types/swiper-class";
import SwiperCore from "swiper";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";
import { IImage } from "../../../types";
import { ProductSwiperSlide } from "./product-swiper-slide";

const breakpoints = {
  300: {
    direction: "horizontal",
    spaceBetween: 4,
  },
  575: {
    direction: "vertical",
    spaceBetween: 12,
  },
};

interface IProductSliderProps {
  images: IImage[];
}

export const ProductSwiper = ({ images }: IProductSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
  const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="product-page__images">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="product-page__previews"
      >
        <div className="swiper-wrapper">
          {images.map((image) => (
            <ProductSwiperSlide image={image} />
          ))}
        </div>
      </Swiper>
      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={16}
        slidesPerView={4}
        watchSlidesProgress
        touchRatio={0.2}
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="product-page__thumb"
        direction={"horizontal"}
      >
        <div className="swiper-wrapper">
          {images.map((image) => (
            <SwiperSlide
              key={`thumbSwiperSlide-${image.file}`}
              className="product-page__thumb"
            >
              <picture>
                <source srcSet={`/static/${image.file}`} />
                <img src={`/static/${image.file}`} alt="" />
              </picture>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
