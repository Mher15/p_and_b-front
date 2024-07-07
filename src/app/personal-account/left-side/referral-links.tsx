import { Link } from "react-router-dom";
import { personalAccountRoutes } from "../data/constants";

export const ReferralLinks = () => (
  <ul className="lk-menu__main-links">
    <li className="lk-menu__main-link">
      <Link to={personalAccountRoutes.REFERRAL_LINKS}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 4H20M20 4V8M20 4L15 9M4 20L9 15M16 20H20M20 20V16M20 20L4 4" />
        </svg>
        <span>РЕФЕРАЛЬНЫЕ ССЫЛКИ</span>
      </Link>
    </li>
  </ul>
);
