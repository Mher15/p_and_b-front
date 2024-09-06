import { IImage } from "../../../types";
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "antd";

interface IProductSliderProps {
  images: IImage[];
}

const TrumbsImage = styled.img`
  height: 62px;
  width: 80px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid transparent;
`;

const CurrentImage = styled.img`
  width: 100%;
  height: 522px;
  object-fit: contain;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PreviewImageContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 777px;
  align-items: center;
`;

const SwiperContainer = styled.div`
  display: grid;
  width: 100%;
  min-width: 380px;
  grid-template-columns: max-content 1fr;
  place-items: center;

  @media (max-width: 991px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const CurrentImageContainer = styled.div`
  width: 100%;
  height: 522px;
  display: grid;
  place-items: center;
`;

const StyledTrumbs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 396px;
  gap: 5px;
  @media (max-width: 991px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 62px;
    justify-content: center;
  }
`;

const ModalContent = styled.div`
  display: flex;
`;

export const ProductSwiper = ({ images }: IProductSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = images[imageIndex];
  const onTrumbClick = (trumbImageIndex: number) => () => {
    setImageIndex(trumbImageIndex);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SwiperContainer>
      <StyledTrumbs>
        {images.map((image, trumbImageIndex) => (
          <TrumbsImage
            src={`/static/${image.file}`}
            alt=""
            style={{
              borderColor: `${
                trumbImageIndex === imageIndex ? "#00b207" : "#c1e9c2"
              }`,
            }}
            onClick={onTrumbClick(trumbImageIndex)}
          />
        ))}
      </StyledTrumbs>
      <CurrentImageContainer onClick={openModal}>
        <CurrentImage src={`/static/${currentImage.file}`} alt="" />
      </CurrentImageContainer>
      <Modal
        open={isModalOpen}
        title={null}
        footer={null}
        onCancel={closeModal}
        width={"80%"}
      >
        <ModalContent>
          <PreviewImageContainer>
            <PreviewImage src={`/static/${currentImage.file}`} />
          </PreviewImageContainer>
        </ModalContent>
      </Modal>
    </SwiperContainer>
  );
};
