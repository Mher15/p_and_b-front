import { Link } from "react-router-dom";
import { appRoutes } from "../../constants";

export const MainLogo = () => (
  <Link className="logo header__logo" to={appRoutes.HOME}>
    <img
      className="logo__img"
      src="/images/logo.svg"
      alt="Best & People - Умные продукты для вашего здоровья"
    />
  </Link>
);
