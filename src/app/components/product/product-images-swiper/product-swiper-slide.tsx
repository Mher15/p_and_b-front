import { useState } from "react";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IImage } from "../../../types";
import { Modal } from "antd";

interface IProductSwiperSlideProps {
  image: IImage;
}

export const ProductSwiperSlide = ({ image }: IProductSwiperSlideProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedImage, setSelectedImage] = useState(image);

  const openModal = () => {
    //setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    //setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SwiperSlide
        key={`previewsSwiperSlide-${image.file}`}
        className="product-page__preview"
      >
        <picture>
          <source srcSet={`/static/${image.file}`} />
          <img
            src={`/static/${image.file}`}
            alt=""
            onClick={() => openModal()}
          />
        </picture>
      </SwiperSlide>
      <Modal
        open={isModalOpen}
        title={null}
        footer={null}
        onCancel={closeModal}
        width={"80%"}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={`/static/${image.file}`}
        />
      </Modal>
    </>
  );
};
