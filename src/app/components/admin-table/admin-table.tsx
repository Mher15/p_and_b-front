import { Layout, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { CSSProperties, MouseEventHandler } from "react";
import { IAdminTableProps } from "../../types";
import DELETE_ICON from "/images/icons/delete-icon.svg";
import EDIT_ICON from "/images/icons/edit-icon.svg";
import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";
import { Button } from "../buttons";
import { buttonSizes, buttonTypes } from "../../constants";
import { ButtonSize, ButtonType } from "../buttons/button";
import styled from "styled-components";
import { Loader } from "../loader/loader";

const headerStyle: CSSProperties = {
  textAlign: "center",
  backgroundColor: "#F7F8FA",
};

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.img`
  cursor: pointer;
  height: 45px;
  width: 45px;
`;

const AdminTableTitle = styled.span`
  color: var(--Gray-Scale-Gray-900, #1a1a1a);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  min-width: 40px;
`;

export const AdminTable = <T,>({
  columns,
  dataSource,
  title,
  createItem,
  updateItem,
  deleteItem,
  isLoading,
}: IAdminTableProps<T>) => {
  const locale = useAppSelector((state) => state.profile.locale);

  const columnsWithActions = [
    ...(columns || []),
    {
      title: "Действия",
      key: "actions",
      render: (_: MouseEventHandler<HTMLImageElement>, record: T) => {
        return (
          <>
            {updateItem && (
              <IconContainer
                src={EDIT_ICON}
                alt="edit icon"
                onClick={() => updateItem(record)}
              />
            )}
            {deleteItem && (
              <IconContainer
                src={DELETE_ICON}
                alt="delete icon"
                onClick={() => deleteItem(record)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <Header style={headerStyle}>
        <HeaderContent>
          <AdminTableTitle>{title}</AdminTableTitle>
          {createItem && (
            <Button
              onClick={createItem}
              size={buttonSizes.MEDIUM as ButtonSize}
              type={buttonTypes.FILL as ButtonType}
            >
              {translate("common.add", locale)}
            </Button>
          )}
        </HeaderContent>
      </Header>
      <Content>
        {isLoading ? (
          <Loader />
        ) : (
          <Table dataSource={dataSource} columns={columnsWithActions} />
        )}
      </Content>
    </Layout>
  );
};
