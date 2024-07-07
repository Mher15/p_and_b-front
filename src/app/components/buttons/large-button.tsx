import { ReactNode } from "react";
import styled from "styled-components";
import { buttonTypes } from "../../constants";
import { ButtonType } from "./button";

const Button = styled.button`
  display: inline-flex;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 43px;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
`;

const FillLargeButton = styled(Button)`
  background: var(--green-bp, #b3db11);
  color: var(--Gray-Scale-White, #fff);
  border: 2px solid var(--green-bp, #b3db11);
  &:hover {
    background: var(--darkgreen-bp, #6e860b);
    border: 2px solid var(--darkgreen-bp, #6e860b);
  }
`;

const BorderLargeButton = styled(Button)`
  border: 2px solid var(--green-bp, #b3db11);
  background: var(--Gray-Scale-White, #fff);
  color: var(--green-bp, #b3db11);
  border: 2px solid var(--green-bp, #b3db11);
  &:hover {
    border: 2px solid var(--darkgreen-bp, #6e860b);
    background: var(--Gray-Scale-White, #fff);
    color: var(--darkgreen-bp, #6e860b);
  }
`;

const GhostLargeButton = styled(Button)`
  background: rgba(179, 219, 17, 0.1);
  color: var(--green-bp, #b3db11);
  border: none;
  &:hover {
    color: var(--darkgreen-bp, #6e860b);
  }
`;

interface IProps {
  type: ButtonType;
  children: ReactNode;
  disable: boolean;
  onClick?: () => void;
}

export const LargeButton = ({ children, type, disable, onClick }: IProps) => {
  if (disable) {
    return <GhostLargeButton onClick={onClick}>{children}</GhostLargeButton>;
  }

  if (type === buttonTypes.BORDER) {
    return <BorderLargeButton onClick={onClick}>{children}</BorderLargeButton>;
  }

  return <FillLargeButton onClick={onClick}>{children}</FillLargeButton>;
};
