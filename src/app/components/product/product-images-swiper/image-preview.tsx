import styled from "styled-components";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IImage } from "../../../types";

const ImagePreviewPortalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IImagePreviewPortalProps {
  children: ReactNode;
}

export const ImagePreviewPortal = ({ children }: IImagePreviewPortalProps) => {
  return createPortal(
    <ImagePreviewPortalBackground>{children}</ImagePreviewPortalBackground>,
    document.getElementById("portal")!
  );
};

interface IPreviewProps {
  image: IImage;
  closeModal: () => void;
}

const Preview = ({ image, closeModal }: IPreviewProps) => (
  <img src={`/static/${image.file}`} alt="" onClick={closeModal} />
);

interface IImagePreviewProps {
  image: IImage;
  closeModal: () => void;
}

export const ImagePreview = ({ image, closeModal }: IImagePreviewProps) => (
  <ImagePreviewPortal>
    <Preview image={image} closeModal={closeModal} />
  </ImagePreviewPortal>
);
