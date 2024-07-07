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
const StyledWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  justify-items: center;

  @media ${device.laptop} {
    margin-top: 20px;
    grid-template-columns: 1fr;
  }

  @media ${device.mobileL} {
    margin-top: 0;
  }
`;

const StyledPayIcons = styled.img`
  width: 100%;
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

export const PaymentRules = () => {
  return (
    <main className="main about">
      <StyledSection>
        <StyledContainer>
          <StyledTop>
            <StyledTitle>Правила оплаты</StyledTitle>
            <br />
            <p>
              К оплате принимаются платежные карты: VISA Inc, MasterCard
              WorldWide, МИР.
            </p>
            <p>
              Для оплаты товара банковской картой при оформлении заказа в
              интернет-магазине выберите способ оплаты: банковской картой.
            </p>
            <p>
              При оплате заказа банковской картой, обработка платежа происходит
              на авторизационной странице банка, где Вам необходимо ввести
              данные Вашей банковской карты:
              <ul>
                <StyledLi>тип карты</StyledLi>
                <StyledLi>номер карты</StyledLi>
                <StyledLi>
                  срок действия карты (указан на лицевой стороне карты)
                </StyledLi>
                <StyledLi>
                  имя держателя карты (латинскими буквами, точно также как
                  указано на карте)
                </StyledLi>
                <StyledLi>CVC2/CVV2 код</StyledLi>
              </ul>
            </p>
            <picture>
              <source srcSet="/images/pay_card.png" />
              <img src="/images/pay_card.png" alt="" />
            </picture>
            <p>
              Если Ваша карта подключена к услуге 3D-Secure, Вы будете
              автоматически переадресованы на страницу банка, выпустившего
              карту, для прохождения процедуры аутентификации. Информацию о
              правилах и методах дополнительной идентификации уточняйте в Банке,
              выдавшем Вам банковскую карту.
            </p>
            <p>
              Безопасность обработки интернет-платежей через платежный шлюз
              банка гарантирована международным сертификатом безопасности PCI
              DSS. Передача информации происходит с применением технологии
              шифрования TLS. Эта информация недоступна посторонним лицам.
            </p>
            <br />
            <p>
              Советы и рекомендации по необходимым мерам безопасности проведения
              платежей с использованием банковской карты:
              <ul>
                <StyledLi>
                  берегите свои пластиковые карты так же, как бережете наличные
                  деньги. Не забывайте их в машине, ресторане, магазине и т.д.
                </StyledLi>
                <StyledLi>
                  никогда не передавайте полный номер своей кредитной карты по
                  телефону каким-либо лицам или компаниям
                </StyledLi>
                <StyledLi>
                  всегда имейте под рукой номер телефона для экстренной связи с
                  банком, выпустившим вашу карту, и в случае ее утраты
                  немедленно свяжитесь с банком
                </StyledLi>
                <StyledLi>
                  вводите реквизиты карты только при совершении покупки. Никогда
                  не указывайте их по каким-то другим причинам
                </StyledLi>
              </ul>
            </p>
          </StyledTop>
          <StyledWrapper>
            <picture>
              <source srcSet="/images/horizontal_logos.png" />
              <StyledPayIcons src="/images/horizontal_logos.png" alt="" />
            </picture>
          </StyledWrapper>
        </StyledContainer>
      </StyledSection>
    </main>
  );
};
