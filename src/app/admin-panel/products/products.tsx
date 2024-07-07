import { Layout } from "antd";
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from "../../../features/api/products-api-slice";
import { setIsProductModalOpen } from "../../../features/modals/product-modal-slice";
import { AdminTable } from "../../components/admin-table/admin-table";
import { Loader } from "../../components/loader/loader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ITableProductItem } from "../../types";
import { translate } from "../../translation";
import { ProductUpsetModal } from "./upset-modal";
import styled from "styled-components";
import { get } from "lodash";

const AdminProductImage = styled.img`
  height: 50px;
`;

export const AdminProducts = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const isOpen = useAppSelector((state) => state.modals.productModal.isOpen);
  const { data: products = [], isLoading: isProductsLoading } =
    useFetchProductsQuery();
  const onAddProduct = () => dispatch(setIsProductModalOpen({ isOpen: true }));
  const [deleteProduct] = useDeleteProductMutation();

  if (isProductsLoading) return <Loader />;

  const handleEditClick = (item: ITableProductItem) => {
    dispatch(
      setIsProductModalOpen({
        isOpen: true,
        formValues: item as ITableProductItem,
      })
    );
  };

  const dataSource: ITableProductItem[] = products.map((dataItem) => ({
    ...dataItem,
    key: String(dataItem.id),
  }));

  const handleDelete = (item: ITableProductItem) => deleteProduct(item.id);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, product: ITableProductItem) => (
        <span className="admin-panel-groups-row-number">{product.id}</span>
      ),
    },
    {
      title: "Картинка",
      dataIndex: "image",
      key: "image",
      render: (_: unknown, product: ITableProductItem) => {
        return (
          <AdminProductImage
            className="admin-panel-groups-image"
            src={`/static/${get(product, "images[0].file")}`}
          />
        );
      },
    },
    {
      title: translate("common.name", locale),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate("common.price", locale),
      dataIndex: "price",
      key: "price",
    },
  ];
  return (
    <Layout>
      <AdminTable
        title="Продукция"
        dataSource={dataSource}
        columns={columns}
        updateItem={(row) => handleEditClick(row)}
        deleteItem={(row) => handleDelete(row)}
        createItem={onAddProduct}
      />
      <ProductUpsetModal isOpen={isOpen} />
    </Layout>
  );
};
