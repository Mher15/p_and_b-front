import styled from "styled-components";
import { useFetchCompanyInfoQuery } from "../../../features/api/company-info-api-slice";
import { useAppSelector } from "../../hooks";
import { Loader } from "../loader";
import { translate } from "../../translation";

const ContactsContainer = styled.div`
  padding: 20px;
`;

const StyledContacts = styled.ul`
  display: flex;
  flex-direction: column;

  font-size: 24px;
  font-weight: 500;
  line-height: 1.42;
  color: #6e860b;

  min-width: 170px;
  a,
  span {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 8px;
  }

  @media (max-width: 991px) {
    font-size: 22px;
    min-width: unset;
  }

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const StyledLink = styled.li`
  a,
  span {
    padding: 10px 0;
    display: flex;
    align-items: center;
    transition: opacity 0.3s ease;
  }

  a {
    &:hover {
      opacity: 0.7;
    }
  }

  &:first-child {
    a,
    span {
      padding-top: 0;
    }
  }

  @media (max-width: 767px) {
    a,
    span {
      padding: 7px 0;
    }

    &--title {
      span {
        padding-bottom: 13px;
      }
    }
  }
`;

const StyledPhone = styled.a`
  margin-bottom: 15px;

  display: flex;
  align-items: center;

  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 28.8px;
  color: #6e860b;

  img {
    margin-right: 10px;
    width: 18px;
    height: 18px;
  }

  @media (max-width: 991px) {
    margin-top: -2px;
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: 767px) {
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 20px;
    line-height: 28px;
  }
`;

export const OurContacts = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: companyInfo, isLoading } = useFetchCompanyInfoQuery();

  if (isLoading) return <Loader />;

  const companyTelegram = companyInfo?.telegram;
  const telegramLink = (companyTelegram || "").replace("@", "https://t.me/");
  return (
    <main className="main about">
      <section className="about__section">
        <div className="container">
          <div className="about__top">
            <h1 className="title about__title">
              ИП Солдатенко Андрей Валентинович
            </h1>
            <div className="about__wrapper">
              <ContactsContainer>
                <div className="footer__grid">
                  <div className="footer__item">
                    {companyInfo?.phone && (
                      <StyledPhone href={`tel:${companyInfo.phone}`}>
                        <img src="/images/icons/phone-green.svg" alt="" />
                        {companyInfo.phone}
                      </StyledPhone>
                    )}
                    <StyledContacts>
                      <StyledLink>
                        {companyInfo?.email && (
                          <span>
                            <img src="/images/icons/email.svg" alt="" />
                            {companyInfo.email}
                          </span>
                        )}
                      </StyledLink>
                      <StyledLink>
                        {companyInfo?.telegram && (
                          <a href={telegramLink}>
                            <img src="/images/icons/telegram.svg" alt="" />
                            {companyTelegram}
                          </a>
                        )}
                      </StyledLink>
                      {companyInfo?.inn && (
                        <StyledLink>
                          <span>
                            {`${translate("ourContacts.inn", locale)}: `}
                            {companyInfo?.inn}
                          </span>
                        </StyledLink>
                      )}
                      {companyInfo?.address && (
                        <StyledLink>
                          <span>
                            {"Адрес: "}
                            {
                              "287592, г. Мариуполь, пгт. Сартана, ул. Шмидта 11А"
                            }
                          </span>
                        </StyledLink>
                      )}
                    </StyledContacts>
                  </div>
                </div>
              </ContactsContainer>
              <div className="about__logo">
                <img src="/images/logo.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
