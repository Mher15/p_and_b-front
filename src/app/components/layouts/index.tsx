import { ReactNode } from "react";
import styled from "styled-components";
import "./styles.css";

interface IPropsType {
  children: ReactNode;
}

const MainLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  .page-layout {
    height: 100%;
    overflow: scroll;
    min-width: 375px;
    min-height: 0px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0px;
  }

  .page-layout::-webkit-scrollbar {
    display: none;
  }
`;

export const MainLayout = ({ children }: IPropsType) => (
  <MainLayoutContainer>{children}</MainLayoutContainer>
);

const ContentLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ContentLayoutContent = styled.div`
  width: 80%;
`;

export const ContentLayout = ({ children }: IPropsType) => (
  <ContentLayoutContainer>
    <ContentLayoutContent>{children}</ContentLayoutContent>
  </ContentLayoutContainer>
);

const VerticalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VerticalLayout = ({ children }: IPropsType) => (
  <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
);

const HorisontalLayoutContainer = styled.div`
  display: flex;
`;

export const HorisontalLayout = ({ children }: IPropsType) => (
  <HorisontalLayoutContainer>{children}</HorisontalLayoutContainer>
);

export const PageLayout = ({ children }: IPropsType) => (
  <div className="page-layout">{children}</div>
);
