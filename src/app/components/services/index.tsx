import styled from "styled-components";
import { device } from "../../constants";

const StyledServicesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 8px 40px 0px #b3db1157;

  @media ${device.laptop} {
    grid-template-columns: 1fr;
  }
`;

interface StyledServicesItemProps {
  background: string;
}

const StyledServicesItem = styled.div<StyledServicesItemProps>`
  display: grid;
  place-items: center;
  width: 100%;
  height: 111px;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const StyledServicesText = styled.div`
  opacity: 1;
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 120%;
  color: white;
  z-index: 100500;

  span {
    margin-top: 16px;
    display: block;
    font-size: 18px;
    line-height: 150%;
    color: white;
  }

  @media ${device.laptop} {
    font-size: 18px;

    span {
      margin-top: 4px;
      font-size: 16px;
    }
  }

  @media ${device.tablet} {
    font-size: 22px;

    span {
      margin-top: 8px;
      font-size: 18px;
    }
  }
`;

export const Services = () => {
  return (
    <div className="transact-info">
      <div className="container">
        <StyledServicesList>
          <StyledServicesItem background="/images/services_ferm_bg.jpeg">
            <StyledServicesText className="transact-info__text">
              <p>Природа даёт нам все решения</p>
              <span>мы собираем их в наших продуктах</span>
            </StyledServicesText>
          </StyledServicesItem>
          <StyledServicesItem background="/images/services_registration_bg.jpg">
            <StyledServicesText className="transact-info__text">
              <p>При регистрации на сайте в качестве клиента</p>
              <span>- скидка 30% навсегда</span>
            </StyledServicesText>
          </StyledServicesItem>
        </StyledServicesList>
      </div>
    </div>
  );
};
