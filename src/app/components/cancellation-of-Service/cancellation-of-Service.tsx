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

export const CancellationOfService = () => {
  return (
    <main className="main about">
      <StyledSection>
        <StyledContainer>
          <StyledTop>
            <StyledTitle>Отказ от услуги</StyledTitle>
            <br />
            <p>
              Право потребителя на расторжение договора об оказании услуги
              регламентируется статьей 32 федерального закона «О защите прав
              потребителей»
            </p>
            <br />
            <ul>
              <StyledLi>
                Потребитель вправе расторгнуть договор об оказании услуги в
                любое время, уплатив исполнителю часть цены пропорционально
                части оказанной услуги до получения извещения о расторжении
                указанного договора и возместив исполнителю расходы,
                произведенные им до этого момента в целях исполнения договора,
                если они не входят в указанную часть цены услуги
              </StyledLi>
              <StyledLi>
                Потребитель при обнаружении недостатков оказанной услуги вправе
                по своему выбору потребовать:
                <ul>
                  <StyledLi>безвозмездного устранения недостатков</StyledLi>
                  <StyledLi>соответствующего уменьшения цены</StyledLi>
                  <StyledLi>
                    возмещения понесенных им расходов по устранению недостатков
                    своими силами или третьими лицами
                  </StyledLi>
                </ul>
              </StyledLi>
              <StyledLi>
                Потребитель вправе предъявлять требования, связанные с
                недостатками оказанной услуги, если они обнаружены в течение
                гарантийного срока, а при его отсутствии в разумный срок, в
                пределах двух лет со дня принятия оказанной услуги
              </StyledLi>
              <StyledLi>
                Исполнитель отвечает за недостатки услуги, на которую не
                установлен гарантийный срок, если потребитель докажет, что они
                возникли до ее принятия им или по причинам, возникшим до этого
                момента
              </StyledLi>
            </ul>
          </StyledTop>
        </StyledContainer>
      </StyledSection>
    </main>
  );
};
