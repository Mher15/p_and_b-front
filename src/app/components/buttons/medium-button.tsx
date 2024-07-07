import { ReactNode } from "react";
import styled from "styled-components";
import { ButtonType } from "./button";
import { buttonTypes } from "../../constants";

const Button = styled.button`
  display: inline-flex;
  padding: 14px 32px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 43px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
`;

const FillMediumButton = styled(Button)`
  background: var(--green-bp, #b3db11);
  border: 2px solid var(--green-bp, #b3db11);
  color: var(--Gray-Scale-White, #fff);
  &:hover {
    background: var(--darkgreen-bp, #6e860b);
    border: 2px solid var(--darkgreen-bp, #6e860b);
  }
`;

const BorderMediumButton = styled(Button)`
  border: 2px solid var(--green-bp, #b3db11);
  background: var(--Gray-Scale-White, #fff);
  color: var(--green-bp, #b3db11);
  &:hover {
    border: 2px solid var(--darkgreen-bp, #6e860b);
    color: var(--darkgreen-bp, #6e860b);
  }
`;

const GhostMediumButton = styled(Button)`
  background: rgba(179, 219, 17, 0.1);
  color: var(--green-bp, #b3db11);
  border: none;
  &:hover {
    background: rgba(179, 219, 17, 0.3);
    color: var(--darkgreen-bp, #6e860b);
  }
`;

interface IProps {
  type: ButtonType;
  children: ReactNode;
  disable: boolean;
  onClick?: () => void;
}

export const MediumButton = ({ children, type, disable, onClick }: IProps) => {
  if (disable) {
    return <GhostMediumButton onClick={onClick}>{children}</GhostMediumButton>;
  }

  if (type === buttonTypes.BORDER) {
    return (
      <BorderMediumButton onClick={onClick}>{children}</BorderMediumButton>
    );
  }

  return <FillMediumButton onClick={onClick}>{children}</FillMediumButton>;
};
