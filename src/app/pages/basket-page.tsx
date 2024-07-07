import "../scss/style.scss";
import { Link } from "react-router-dom";
import { appRoutes, userRoles } from "../constants";
import { useAppSelector } from "../hooks";
import { Breadcrumbs } from "../components/breadcrumbs";
import { BasketItem } from "../components/basket-item";
import { getPriceWithMarkup } from "../../utils";
import { get } from "lodash";

export const BasketPage = () => {
  const user = useAppSelector((state) => state.profile.user);
  const userRole = user?.role || userRoles.GUEST;
  const basketRows = useAppSelector((state) => state.basket.rows);

  const prices = basketRows.map((row) => {
    const price = get(row, "product.price");
    const resultPrice = getPriceWithMarkup(price, userRole);
    return resultPrice * (row.count || 0);
  });

  let sum = 0;

  prices.forEach(function (num) {
    sum += num;
  });

  return (
    <main className="main invoice-page">
      <Breadcrumbs />
      <section className="invoice-page__section">
        <div className="container">
          <h1 className="title invoice-page__title">Корзина</h1>
          <div>
            <p>
              Добро пожаловать в компанию <b>BEST & PEOPLE</b> — компанию № 1 с
              умными продуктами для вашей активной жизни!
            </p>
            <p>
              Вы можете оформить заказ прямо сейчас как посетитель сайта по
              ценам, которые отображены сейчас на сайте, или зарегистрироваться
              как клиент и получить выгоду 30% на весь ассортимент.
            </p>
            <p>
              {" "}
              Для того, чтобы зарегистрироваться в качестве клиента, вам
              необходимо найти наставника, который будет помогать вам и
              расскажет о продукции. Если у вас уже есть знакомый партнёр BEST &
              PEOPLE, который рассказал вам о компании, свяжитесь с ним для
              регистрации. Если у вас нет знакомого партнера BEST & PEOPLE, то
              вы можете посмотреть в разных соцсетях людей с хэштегом
              <b> #bestandpeople</b> или <b>#лучшееилюди</b> и связаться с любым
              заинтересовавшим вас партнёром, который поможет зарегистрировать
              вас в компании и расскажет с чего начинать. Зарегистрировавшись в
              качестве клиента вам доступен весь ассортимент продукции компании
              с выгодой 30% на постоянной основе.
            </p>
            <p>
              Благодарим вас за интерес к компании BEST & PEOPLE и желаем
              успехов в получении желаемых результатов!
            </p>
          </div>
          <div className="invoice-page__wrapper">
            <div className="invoice-page__content">
              <table className="invoice-page__table">
                <thead className="invoice-page__header">
                  <tr>
                    <th>Продукт</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                  </tr>
                </thead>
                <tbody className="invoice-page__body">
                  {basketRows.map((basketRow) => (
                    <BasketItem
                      key={basketRow.product.id}
                      basketRow={basketRow}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="invoice-page__result">
              <h2 className="title title--sm">К оплате</h2>
              <dl className="invoice-page__result-list">
                <div>
                  <dt>Стоимость:</dt>
                  <dd className="invoice-page__price">{sum.toFixed(2)} ₽ </dd>
                </div>
                <div>
                  <dt>Доставка:</dt>
                  <dd>
                    <b>Не расчитана</b>
                  </dd>
                </div>
                <div>
                  <dt>Итого:</dt>
                  <dd className="invoice-page__price">{sum.toFixed(2)} ₽ </dd>
                </div>
              </dl>
              <Link to={appRoutes.ORDER}>
                <button className="btn btn--lg invoice-page__result-btn">
                  Продолжить
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
