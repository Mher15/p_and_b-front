import { Outlet } from "react-router-dom";
import { ContentLayout } from "../components/layouts";
import { Tabs } from "./tabs";
import styled from "styled-components";

const AdminPanelContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  border: 1px solid var(--Gray-Scale-Gray-100, #e6e6e6);
  border-radius: 10px;
  gap: 10px;
`;

export const AdminPanel = () => {
  return (
    <ContentLayout>
      <AdminPanelContainer>
        <Tabs />
        <Outlet />
      </AdminPanelContainer>
    </ContentLayout>
  );
};
