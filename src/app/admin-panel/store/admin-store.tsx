import { Loader } from "../../components/loader/loader";
import { Table } from "antd";
import { IProduct, IStoreItem } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useFetchProductsQuery } from "../../../features/api/products-api-slice";
import {
  useFetchStoreQuery,
  useUpdateStoreMutation,
} from "../../../features/api/store-api-slice";
import styled from "styled-components";
import { CountCell } from "./count-cell";
import { get, isEmpty } from "lodash";
import { Button } from "../../components/buttons";
import { buttonSizes, buttonTypes } from "../../constants";
import { translate } from "../../translation";
import { ButtonSize, ButtonType } from "../../components/buttons/button";
import { clearStore } from "../../../features/store/store-slice";

const AdminPage = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: max-content 1fr;
`;

const AdminPageHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-content: center;
  margin: 10px;
`;

const AdminPageContent = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
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

const AdminStoreProductContainer = styled.div`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 10px;
`;

const AdminStoreProductImage = styled.img`
  height: 45px;
`;

interface ITableStoreItem {
  id: number;
  product: IProduct;
  count: number;
  key: string;
}

export const AdminStore = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const store = useAppSelector((state) => state.store.rows);
  const { data: storeItems = [], isLoading: isStoreLoading } =
    useFetchStoreQuery();
  const { data: products = [], isLoading: isProductsLoading } =
    useFetchProductsQuery();

  const [saveStore, { isLoading: isNewStoreLoading }] =
    useUpdateStoreMutation();

  const handleSaveStore = () => {
    saveStore(store);
    dispatch(clearStore());
  };

  const missingProducts = products.filter(
    (product) =>
      !storeItems.some((storeItem) => storeItem.product.id === product.id)
  );

  const missingStoreItems: ITableStoreItem[] = missingProducts.map(
    (product) => ({
      id: 0,
      product,
      count: 0,
      key: String(product.id),
    })
  );

  const storeItemsSource: ITableStoreItem[] = storeItems.map(
    (storeItem: IStoreItem) => ({
      ...storeItem,
      key: String(storeItem.product.id),
    })
  );

  const dataSource: ITableStoreItem[] = [
    ...storeItemsSource,
    ...missingStoreItems,
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (_: unknown, record: ITableStoreItem) =>
        record.id ? record.id : "новый",
    },
    {
      title: "Продукт",
      dataIndex: "product",
      key: "product",
      width: "60%",
      render: (_: unknown, record: ITableStoreItem) => {
        return (
          <AdminStoreProductContainer>
            <AdminStoreProductImage
              src={`/static/${get(record, "product.images[0].file")}`}
              alt=""
            />
            <h3>{record.product.name}</h3>
          </AdminStoreProductContainer>
        );
      },
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
      width: "20%",
      render: (_: unknown, record: ITableStoreItem) => (
        <CountCell storeItem={record} />
      ),
    },
  ];

  return (
    <AdminPage>
      <AdminPageHeader>
        <AdminTableTitle>{"Склад"}</AdminTableTitle>
        {!isEmpty(store) && (
          <Button
            onClick={handleSaveStore}
            size={buttonSizes.MEDIUM as ButtonSize}
            type={buttonTypes.FILL as ButtonType}
          >
            {translate("common.save", locale)}
          </Button>
        )}
      </AdminPageHeader>
      <AdminPageContent>
        {isStoreLoading || isProductsLoading || isNewStoreLoading ? (
          <Loader />
        ) : (
          <Table
            style={{ width: "100%" }}
            dataSource={dataSource}
            columns={columns}
          />
        )}
      </AdminPageContent>
    </AdminPage>
  );
};
