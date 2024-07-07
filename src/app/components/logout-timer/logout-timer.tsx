import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../features/profile/profile-slice";
import { LOCAL_STORAGE_TOKEN_KEY, appRoutes } from "../../constants";
import { useAppDispatch } from "../../hooks";

export const LogoutTimer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    dispatch(setUser(null));
    navigate(`${appRoutes.HOME}`);
  };

  let timeout = null;

  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleExit();
    }, 5 * 60 * 1000);
  };

  useEffect(() => {
    resetTimer();

    const resetOnAction = () => {
      resetTimer();
    };

    document.addEventListener("click", resetOnAction);
    document.addEventListener("keydown", resetOnAction);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", resetOnAction);
      document.removeEventListener("keydown", resetOnAction);
    };
  }, []);

  return null;
};
