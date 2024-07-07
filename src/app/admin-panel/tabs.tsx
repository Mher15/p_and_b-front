import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { buttonSizes, buttonTypes } from "../constants";
import { adminPanelTabs, adminPanelTabsTranslate } from "./data/constants";
import { Button } from "../components/buttons";
import { ButtonSize, ButtonType } from "../components/buttons/button";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border: 1px solid var(--Gray-Scale-Gray-100, #e6e6e6);
  border-radius: 10px;
  gap: 10px;
`;

const { GROUPS, PRODUCTS, BRANDS, STORE, COMPANY_INFO, MARKETING, DOCUMENTS } =
  adminPanelTabs;

const TABS = [
  STORE,
  PRODUCTS,
  GROUPS,
  BRANDS,
  COMPANY_INFO,
  MARKETING,
  DOCUMENTS,
];

export const Tabs = () => {
  const { pathname } = useLocation();

  return (
    <TabsContainer>
      {TABS.map((tab) => {
        const isActive = pathname === `/admin/${tab}`;

        return (
          <div key={tab}>
            <Link key={tab} to={`${tab}`}>
              <Button
                size={buttonSizes.MEDIUM as ButtonSize}
                type={
                  isActive
                    ? (buttonTypes.FILL as ButtonType)
                    : (buttonTypes.BORDER as ButtonType)
                }
              >
                {adminPanelTabsTranslate[tab]}
              </Button>
            </Link>
          </div>
        );
      })}
    </TabsContainer>
  );
};
