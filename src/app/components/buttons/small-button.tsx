import type { ReactNode } from "react";
import { ButtonType } from "./button";
import styled from "styled-components";
import { buttonTypes } from "../../constants";

const Button = styled.button`
  display: inline-flex;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 43px;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
`;

const FillSmallButton = styled(Button)`
  background: #b3db11;
  color: var(--Gray-Scale-White, #fff);
  border: 2px solid var(--green-bp, #b3db11);
  &:hover {
    background: var(--darkgreen-bp, #6e860b);
    border: 2px solid var(--darkgreen-bp, #6e860b);
  }
`;

const BorderSmallButton = styled(Button)`
  border: 2px solid var(--green-bp, #b3db11);
  background: var(--Gray-Scale-White, #fff);
  color: var(--green-bp, #b3db11);
  &:hover {
    border: 2px solid var(--darkgreen-bp, #6e860b);
    color: var(--darkgreen-bp, #6e860b);
  }
`;

const GhostSmallButton = styled(Button)`
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

export const SmallButton = ({ children, type, disable, onClick }: IProps) => {
  if (disable) {
    return <GhostSmallButton onClick={onClick}>{children}</GhostSmallButton>;
  }

  if (type === buttonTypes.BORDER) {
    return <BorderSmallButton onClick={onClick}>{children}</BorderSmallButton>;
  }

  return <FillSmallButton onClick={onClick}>{children}</FillSmallButton>;
};
