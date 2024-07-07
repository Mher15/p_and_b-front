import { Layout } from "antd";
import {
  useDeleteBrandMutation,
  useFetchBrandsQuery,
} from "../../../features/api/brand-api-slice";
import { setIsBrandModalOpen } from "../../../features/modals/brand-modal-slice";
import { Loader } from "../../components/loader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IBrand } from "../../types";
import { AdminTable } from "../../components/admin-table/admin-table";
import { translate } from "../../translation";
import { BrandUpsetModal } from "./upset-modal";
import styled from "styled-components";

const AdminBrandImage = styled.img`
  height: 50px;
`;
interface ITableBrandItem {
  id: number;
  name: string;
  image: string;
  key: string;
}

export const AdminBrands = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const isOpen = useAppSelector((state) => state.modals.brandModal.isOpen);
  const { data = [], isLoading } = useFetchBrandsQuery();
  const onAddBrand = () => dispatch(setIsBrandModalOpen({ isOpen: true }));
  const [deleteBrand] = useDeleteBrandMutation();

  if (isLoading) return <Loader />;

  const handleEditClick = (item: ITableBrandItem) => {
    dispatch(setIsBrandModalOpen({ isOpen: true, formValues: item as IBrand }));
  };

  const dataSource: ITableBrandItem[] = data.map((dataItem) => ({
    ...dataItem,
    key: String(dataItem.id),
  }));

  const handleDelete = (item: ITableBrandItem) => deleteBrand(item);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, brand: ITableBrandItem) => (
        <span className="admin-panel-groups-row-number">{brand.id}</span>
      ),
    },
    {
      title: "Картинка",
      dataIndex: "image",
      key: "image",
      render: (_: unknown, brand: ITableBrandItem) => (
        <AdminBrandImage
          className="admin-panel-groups-image"
          src={`/static/${brand.image}`}
        />
      ),
    },
    {
      title: translate("common.name", locale),
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <Layout>
      <AdminTable
        title="Бренды товаров"
        dataSource={dataSource}
        columns={columns}
        updateItem={(row) => handleEditClick(row)}
        deleteItem={(row) => handleDelete(row)}
        createItem={onAddBrand}
      />
      <BrandUpsetModal isOpen={isOpen} />
    </Layout>
  );
};
