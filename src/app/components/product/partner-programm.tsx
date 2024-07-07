import { useState } from "react";
import { AuthentificationModal } from "../modals";
import { noop } from "lodash";
import styled from "styled-components";

const BevelDiscount = styled.b`
  font-size: 36px;
  font-weight: 400;
  color: #ff8a00;
`;

const Discount = styled.div`
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 120%;
  color: #616161;
  @media (max-width: 575px) {
    text-align: right;
  }
`;

const Title = styled.h2`
  margin-top: 12px;
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 150%;
  color: #000;
`;

const Text = styled.p`
  margin-top: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 130%;
  color: #000;
  opacity: 0.7;
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #b3db11;
  padding: 68px 141px;
  display: flex;
  align-items: center;

  @media (max-width: 1199px) {
    padding: 68px 40px;
  }

  @media (max-width: 991px) {
    padding: 48px 20px;
    flex-direction: column;
  }

  @media (max-width: 767px) {
    padding: 48px 120px;
  }

  @media (max-width: 575px) {
    padding: 38px 14px 54px;
  }
`;

const ArrowImage = styled.img`
  width: 200px;
  @media (max-width: 991px) {
    padding: 48px 20px;
    transform: rotate(90deg);
  }
`;

const CircleImage = styled.img`
  width: 350px;
`;

export const PartnerProgram = () => {
  const [isNewPartnerModalOpen, setIsNewPartnerModalOpen] = useState(false);

  const handleNewPartnerClick = () => {
    setIsNewPartnerModalOpen(true);
  };

  return (
    <section className="partner-program">
      <div className="container">
        <Wrapper>
          <div>
            <Text>лучшая система</Text>
            <Title className="partner-program__title">вознаграждений</Title>
            <Discount>
              <BevelDiscount>в индустрии</BevelDiscount>
            </Discount>
            <button
              onClick={handleNewPartnerClick}
              className="btn btn--lg partner-program__link"
            >
              <span>Стать партнером</span>
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 7.00049H1" />
                <path d="M9.9502 0.975586L16.0002 6.99959L9.9502 13.0246" />
              </svg>
            </button>
          </div>
          <picture>
            <source srcSet="/images/partner-arrow.png" />
            <ArrowImage src="/images/partner-arrow.png" alt="" />
          </picture>
          <picture>
            <source srcSet="/images/partner-circle.png" />
            <CircleImage src="/images/partner-circle.png" alt="" />
          </picture>
        </Wrapper>
      </div>
      <AuthentificationModal
        isOpen={isNewPartnerModalOpen}
        step={3}
        setIsOpen={setIsNewPartnerModalOpen}
        setStep={noop}
      />
    </section>
  );
};
