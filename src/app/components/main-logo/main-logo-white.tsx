import { Link } from "react-router-dom";
import LOGO from "../../../assets/logo-white.svg";
import BEST_TEXT from "../../../assets/best_text.svg";
import PEOPLE_TEXT from "../../../assets/piople_text.svg";
import { appRoutes } from "../../constants";
import "./styles.css";

export const MainLogoWhite = () => (
  <Link className="main-logo-white-link" to={appRoutes.HOME}>
    <img className="main-logo-white" src={LOGO} />
    <div>
      <img className="main-logo-white-text" src={BEST_TEXT} />
      <img className="main-logo-white-text" src={PEOPLE_TEXT} />
    </div>
  </Link>
);
