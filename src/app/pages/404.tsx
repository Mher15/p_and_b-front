import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/breadcrumbs";
import { appRoutes } from "../constants";
import "../scss/style.scss";
export const NotFound = () => {
  return (
    <main className="main error-page">
      <Breadcrumbs />
      <section className="error-page__section">
        <div className="container">
          <h1 className="title error-page__title">Страница не найдена</h1>
          <div className="error-page__figure">
            <p>
              4<b>0</b>4
            </p>
            <span>ошибка</span>
          </div>
          <p className="error-page__text">
            Страница не найдена. <br />
            Возможно, она была перемещена, или вы просто неверно указали адрес
            страницы.
          </p>
          <Link to={appRoutes.HOME}>На главную страницу</Link>
        </div>
      </section>
    </main>
  );
};
