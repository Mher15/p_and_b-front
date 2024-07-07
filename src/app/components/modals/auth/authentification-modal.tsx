import { jwtDecode } from "jwt-decode";
import {
  useLoginMutation,
  useRestorePasswordMutation,
} from "../../../../features/api/auth-api-slice";
import { setUser } from "../../../../features/profile/profile-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  IAuthentificationResponse,
  IQueryResponse,
  IUser,
} from "../../../types";
import { AuthentificationForm } from "./authentification-form";
import { appRoutes } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
import styled from "styled-components";
import { RestorePasswordForm } from "./restore-password-form";

interface IAuthentificationFormValues {
  password: string;
  phone: string;
}

interface IRestorePasswordFormValues {
  phone: string;
}

interface IAuthentificationModalProps {
  isOpen: boolean;
  step: number;
  setIsOpen: (isOpen: boolean) => void;
  setStep: (step: number) => void;
}

const StyledText = styled.span`
  font-weight: 700;
  color: #ff8a00;
`;

export const AuthentificationModal = ({
  isOpen,
  setIsOpen,
  step,
  setStep,
}: IAuthentificationModalProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const [login, { error }] = useLoginMutation();
  const [restorePassword] = useRestorePasswordMutation();
  const navigate = useNavigate();
  const [authForm] = Form.useForm();
  const [restorePasswordForm] = Form.useForm();

  const handleClose = () => {
    authForm.resetFields();
    restorePasswordForm.resetFields();
    setIsOpen(false);
    setStep(1);
  };

  const handleStartPartner = () => {
    setStep(3);
  };

  const handleStartClient = () => {
    setStep(4);
  };

  const handleForgetPassword = () => {
    setStep(2);
  };

  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotification = () => {
    api.error({
      message: "Пользователь ",
      description: "с таким телефоном или паролем не обнаружен",
      placement: "bottomRight",
    });
  };

  const showRestorePasswordNotification = (email: string) => {
    api.info({
      message: "Пароль восстановлен",
      description: `и направлен на почту ${email}`,
      placement: "bottomRight",
    });
  };

  const onFinish = (values: IAuthentificationFormValues) => {
    login(values).then(
      (response: IQueryResponse<IAuthentificationResponse>) => {
        const { data, error } = response;
        if (error || !data) {
          throw new Error(`Authentification failed: ${error}`);
        }

        const { token } = data;
        localStorage.setItem("token", token);
        const user: IUser = jwtDecode(token);
        dispatch(setUser(user));
        authForm.resetFields();
        handleClose();
        navigate(`${appRoutes.PERSONAL_ACCOUNT}`);
      }
    );
  };

  const handleRestorePassword = (values: IRestorePasswordFormValues) => {
    restorePassword(values).then(
      (response: IQueryResponse<IAuthentificationResponse>) => {
        const { data, error } = response;
        if (error || !data) {
          throw new Error(`Authentification failed: ${error}`);
        }
        const { token } = data;
        const user: IUser = jwtDecode(token);
        restorePasswordForm.resetFields();
        handleClose();
        navigate(`${appRoutes.HOME}`);
        showRestorePasswordNotification(user.email);
      }
    );
  };

  if (error) {
    openNotification();
  }

  return (
    <article
      className={`modal modal--stepped ${isOpen ? "open" : ""}`}
      data-modal="login-steps"
    >
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
        className={`modal__curtain modal__curtain--login ${
          step === 1 ? "active" : ""
        }`}
        data-modal-step="1"
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">Войти в мой офис</h2>
          <p className="modal__descr" onClick={handleStartPartner}>
            Начать бизнес с B&P
          </p>
          <p className="modal__descr" onClick={handleStartClient}>
            Стать клиентом B&P
          </p>
          <AuthentificationForm
            locale={locale}
            onFinish={onFinish}
            handleForgetPassword={handleForgetPassword}
            form={authForm}
          />
        </div>
      </div>
      <div
        className={`modal__curtain modal__curtain--forget ${
          step === 2 ? "active" : ""
        }`}
        data-modal-step="2"
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">Восстановление пароля</h2>
          <p className="modal__descr">Отправить пароль на электронную почту </p>
          <RestorePasswordForm
            onFinish={handleRestorePassword}
            form={restorePasswordForm}
            locale={locale}
          />
        </div>
      </div>
      <div
        className={`modal__curtain modal__curtain--begin ${
          step === 3 ? "active" : ""
        }`}
        data-modal-step="3"
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">Начать бизнес с B&P</h2>
          <div className="modal__text-content">
            <p>
              Добро пожаловать в компанию <b>BEST&PEOPLE</b> — компанию № 1 с
              умными продуктами для вашей активной жизни в сфере сетевого
              бизнеса!
            </p>
            <p>
              Для того, чтобы зарегистрироваться в качестве независимого
              партнёра, вам необходимо найти наставника, который будет помогать
              вам на протяжении всего пути к построению успешного и стабильного
              бизнеса, расскажет о компании, возможностях и продукции. <br />
              Если у вас уже есть знакомый <b>партнёр BEST&PEOPLE</b>, который
              рассказал вам о компании, свяжитесь с ним для дальнейшей
              регистрации. <br />
              Если у вас нет знакомого партнера BEST&PEOPLE, то вы можете
              посмотреть в соцсетях людей с хэштегом{" "}
              <a href="#">#bestandpeople</a> или <a href="#">#лучшееилюди</a> и
              среди них связаться с любым заинтересовавшим партнёром, который
              поможет зарегистрировать вас в компании и расскажет с чего
              начинать. <br />
            </p>
            <p>
              Благодарим вас за интерес к BEST&PEOPLE и желаем успехов в
              развитии бизнеса!
            </p>
          </div>
        </div>
      </div>
      <div
        className={`modal__curtain modal__curtain--begin ${
          step === 4 ? "active" : ""
        }`}
        data-modal-step="4"
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
                <StyledText>
                  <b>
                    Зарегистрировавшись в качестве клиента вам доступен весь
                    ассортимент продукции компании со скидкой 30% на постоянной
                    основе.
                  </b>
                </StyledText>
            </p>
            <p>
              Благодарим вас за интерес к компании BEST & PEOPLE и желаем
              успехов в получении желаемых результатов!
            </p>
          </div>
        </div>
      </div>
      {contextHolder}
    </article>
  );
};
