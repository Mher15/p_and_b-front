import { useCallback, useEffect, useRef } from "react";
import { useFetchGroupsQuery } from "../../../../features/api/groups-api-slice";
import { DropdownItem } from "./dropdown-item";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setHamburgerOpen: (isOpen: boolean) => void;
}

export const Dropdown = ({ isOpen, setIsOpen, setHamburgerOpen }: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: groups = [], isLoading } = useFetchGroupsQuery();

  const handleClickEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setHamburgerOpen(false);
      }
    },
    [setIsOpen, setHamburgerOpen]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleClickEsc);
    return () => {
      document.removeEventListener("keydown", handleClickEsc);
    };
  }, [handleClickEsc]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    !isLoading && (
      <div
        className={`dropdown__wrapper ${isOpen ? "open" : ""}`}
        style={isOpen ? { maxHeight: 300 } : {}}
        ref={dropdownRef}
      >
        <ul className="dropdown__list">
          {groups.map((group) => (
            <DropdownItem
              key={group.id}
              group={group}
              setIsOpen={setIsOpen}
              setHamburgerOpen={setHamburgerOpen}
            />
          ))}
        </ul>
      </div>
    )
  );
};
