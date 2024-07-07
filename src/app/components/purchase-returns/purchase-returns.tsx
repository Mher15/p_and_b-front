import { device } from "../../constants";
import styled from "styled-components";

const StyledSection = styled.section`
  padding: 65px 0 150px;

  @media ${device.mobileL} {
    padding: 45px 0 100px;
  }

  @media ${device.tablet} {
    padding: 80px 0 40px;
  }
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1150px;

  @media ${device.laptop} {
    max-width: 1010px;
  }
`;

const StyledTop = styled.div`
  padding-left: 20px;

  @media ${device.laptop} {
    padding-left: 0;
  }
`;

const StyledTitle = styled.h1`
  @media ${device.mobileL} {
    font-size: 40px;
  }
`;

const StyledLi = styled.li`
  position: relative;
  margin-top: 10px;
  padding-left: 30px;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 0;
    width: 14px;
    height: 14px;
    background: url("/images/icons/checkmark.svg") center center / contain
      no-repeat;
  }

  &:first-child {
    margin-top: 0;
  }
`;

export const PurchaseReturns = () => {
  return (
    <main className="main about">
      <StyledSection>
        <StyledContainer>
          <StyledTop>
            <StyledTitle>Возврат товара</StyledTitle>
            <br />
            <p>
              Процедура возврата товара регламентируется статьей 26.1
              федерального закона «О защите прав потребителей».
            </p>
            <br />
            <ul>
              <StyledLi>
                Потребитель вправе отказаться от товара в любое время до его
                передачи, а после передачи товара - в течение семи дней
              </StyledLi>
              <StyledLi>
                Возврат товара надлежащего качества возможен в случае, если
                сохранены его товарный вид, потребительские свойства, а также
                документ, подтверждающий факт и условия покупки указанного
                товара
              </StyledLi>
              <StyledLi>
                Потребитель не вправе отказаться от товара надлежащего качества,
                имеющего индивидуально-определенные свойства, если указанный
                товар может быть использован исключительно приобретающим его
                человеком
              </StyledLi>
              <StyledLi>
                При отказе потребителя от товара продавец должен возвратить ему
                денежную сумму, уплаченную потребителем по договору, за
                исключением расходов продавца на доставку от потребителя
                возвращенного товара, не позднее чем через десять дней со дня
                предъявления потребителем соответствующего требования
              </StyledLi>
            </ul>
          </StyledTop>
        </StyledContainer>
      </StyledSection>
    </main>
  );
};
