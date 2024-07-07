import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../hooks";
import CLOSE from "/images/icons/close.svg";
import styled from "styled-components";

type ModalPropsType = {
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const PortalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-content: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: relative;
  border: 1px solid var(--Gray-Scale-Gray-100, #e6e6e6);
  background: var(--Gray-Scale-White, #fff);
  box-shadow: 0px 12px 48px 0px rgba(0, 0, 0, 0.12);
  width: 50%;
  padding: 40px;
`;

const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: max-content 1fr;
  gap: 20px;
`;

const ModalHeader = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: max-content 1fr;
  gap: 20px;
`;

const ModalTitle = styled.span`
  color: var(--Text2, #000);
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 300;
  line-height: 30px; /* 83.333% */
  letter-spacing: 1.44px;
`;

const ModalClose = styled.div`
  width: 45px;
  height: 45px;
  cursor: pointer;
  justify-self: center;
  align-self: center;
`;

export const Modal = ({ onClose, title, children }: ModalPropsType) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(onClose);

  return createPortal(
    <PortalBackground>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalClose>
              <img
                className="modal-close"
                onClick={handleClose}
                src={CLOSE}
                alt="close icon"
              />
            </ModalClose>
          </ModalHeader>
          {children}
        </ModalContent>
      </ModalContainer>
    </PortalBackground>,
    document.getElementById("portal")!
  );
};

type PortalPropsType = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalPropsType) => {
  return createPortal(
    <div className="portal-background">{children}</div>,
    document.getElementById("portal")!
  );
};
