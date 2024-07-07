import { Link } from "react-router-dom";
import { appRoutes } from "../constants";

export const ErrorPage = () => (
  <section className="error-page__section">
    <div className="container">
      <h1 className="title error-page__title">Что-то пошло не так</h1>
      <div className="error-page__figure error-page__figure--images">
        <img src="./images/something-wrong.svg" alt="" />
      </div>
      <Link className="btn btn--lg error-page__btn" to={appRoutes.HOME}>
        На главную страницу
      </Link>
    </div>
  </section>
);
