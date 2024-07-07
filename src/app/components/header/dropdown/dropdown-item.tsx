import { Link } from "react-router-dom";
import { appRoutes } from "../../../constants";
import { IGroup } from "../../../types";

interface IProps {
  group: IGroup;
  setIsOpen: (isOpen: boolean) => void;
  setHamburgerOpen: (isOpen: boolean) => void;
}

export const DropdownItem = ({
  setHamburgerOpen,
  group,
  setIsOpen,
}: IProps) => {
  const handleClose = () => {
    setIsOpen(false);
    setHamburgerOpen(false);
  };
  return (
    <li className="dropdown__item">
      <Link
        to={`${appRoutes.CATALOG}?group=${group.name}`}
        onClick={handleClose}
      >
        <span className="dropdown__icon">
          <img src={`/static/${group.image}`} alt={group.description} />
        </span>
        <span>{group.name}</span>
      </Link>
    </li>
  );
};
