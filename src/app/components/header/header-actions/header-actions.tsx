import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { appRoutes } from "../../../constants";
import { AuthentificationModal } from "../../modals";
import { useState } from "react";

export const HeaderActions = () => {
  const basketRows = useAppSelector((state) => state.basket.rows);
  const user = useAppSelector((state) => state.profile.user);

  const navigate = useNavigate();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [step, setStep] = useState(1);

  const onClick = () => {
    if (user?.referralId) {
      return navigate(`${appRoutes.PERSONAL_ACCOUNT}`);
    }
    setIsAuthOpen(!isAuthOpen);
  };

  return (
    <div className="header__controls">
      <button
        className="btn--reset header-profile header__control"
        data-trigger-modal="login-steps"
        data-trigger-modal-step="1"
        onClick={onClick}
      >
        <img src="/images/icons/profile.svg" alt="" />
      </button>
      <Link className="header-cart header__control" to={appRoutes.BASKET}>
        <img
          className="header-cart__icon"
          src="/images/icons/cart.svg"
          alt=""
        />
        {Boolean(basketRows.length) && (
          <span className="header-cart__count">{basketRows.length}</span>
        )}
      </Link>
      <AuthentificationModal
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
        step={step}
        setStep={setStep}
      />
    </div>
  );
};
