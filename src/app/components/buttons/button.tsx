import { ReactNode } from "react";
import { buttonSizes } from "../../constants";
import { SmallButton } from "./small-button";
import { MediumButton } from "./medium-button";
import { LargeButton } from "./large-button";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonType = "fill" | "border" | "ghost";

interface IProps {
  size: ButtonSize;
  type: ButtonType;
  children: ReactNode;
  disable?: boolean;
  onClick?: () => void;
  httpType?: string;
}

export const Button = ({ size, type, disable, children, onClick }: IProps) => {
  switch (size) {
    case buttonSizes.SMALL:
      return (
        <SmallButton type={type} onClick={onClick} disable={disable || false}>
          {children}
        </SmallButton>
      );
    case buttonSizes.MEDIUM:
      return (
        <MediumButton type={type} onClick={onClick} disable={disable || false}>
          {children}
        </MediumButton>
      );
    case buttonSizes.LARGE:
    default:
      return (
        <LargeButton type={type} onClick={onClick} disable={disable || false}>
          {children}
        </LargeButton>
      );
  }
};
