import styled from "styled-components";

interface INewClientModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledText = styled.span`
  font-weight: 700;
  color: #ff8a00;
`;

export const NewClientModal = ({ isOpen, setIsOpen }: INewClientModalProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <article className={`modal ${isOpen ? "open" : ""}`}>
      <button
        className="btn--reset components__close modal__close"
        onClick={handleClose}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L1 9"></path>
          <path d="M9 9L1 1"></path>
        </svg>
      </button>

      <div
        className={`modal__curtain modal__curtain--begin active`}
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">Стать клиентом B&P</h2>
          <div className="modal__text-content">
         <p>
              Добро пожаловать в компанию <b>BEST&PEOPLE</b> — компанию № 1 с
              умными продуктами для вашей активной жизни!
            </p>
           <p>
              Для того, чтобы зарегистрироваться в качестве клиента, вам
              необходимо найти наставника, который будет помогать вам и
              расскажет о продукции. Если у вас уже есть знакомый{" "}
              <b>партнёр BEST&PEOPLE</b>, который рассказал вам о компании,
              свяжитесь с ним для дальнейшей регистрации. <br />
              Если у вас нет знакомого партнера BEST&PEOPLE, то вы можете
              посмотреть в соцсетях людей с хэштегом{" "}
              <a href="#">#bestandpeople</a> или <a href="#">#лучшееилюди</a> и
              среди них связаться с любым заинтересовавшим партнёром, который
              поможет зарегистрировать вас в компании и расскажет с чего
              начинать. <br />
              <p>
                <StyledText>
                  <b>
                    Зарегистрировавшись в качестве клиента вам доступен весь
                    ассортимент продукции компании со скидкой 30% на постоянной
                    основе.
                  </b>
                </StyledText>
              </p>
            </p>
            <p>
              Благодарим вас за интерес к компании BEST & PEOPLE и желаем
              успехов в получении желаемых результатов!
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
