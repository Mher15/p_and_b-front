import {
  useFetchGroupsQuery,
  useDeleteGroupMutation,
} from "../../../features/api/groups-api-slice";
import { setIsGroupModalOpen } from "../../../features/modals/group-modal-slice";
import { AdminTable } from "../../components/admin-table/admin-table";
import { Loader } from "../../components/loader/loader";
import { GroupUpsetModal } from "./upset-modal";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { translate } from "../../translation";
import { IGroup } from "../../types";
import styled from "styled-components";

interface ITableGroupItem {
  id: number;
  name: string;
  image: string;
  key: string;
}

const AdminGroupImage = styled.img`
  height: 50px;
`;

export const AdminGroups = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const isOpen = useAppSelector((state) => state.modals.groupModal.isOpen);
  const { data = [], isLoading } = useFetchGroupsQuery();
  const onAddGroup = () => dispatch(setIsGroupModalOpen({ isOpen: true }));
  const [deleteGroup] = useDeleteGroupMutation();

  if (isLoading) return <Loader />;

  const handleEditClick = (item?: ITableGroupItem) => {
    dispatch(setIsGroupModalOpen({ isOpen: true, formValues: item as IGroup }));
  };

  const dataSource: ITableGroupItem[] = data.map((dataItem) => ({
    ...dataItem,
    key: String(dataItem.id),
  }));

  const handleDelete = (item: ITableGroupItem) => deleteGroup(item);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, group: ITableGroupItem) => (
        <span className="admin-panel-groups-row-number">{group.id}</span>
      ),
    },
    {
      title: "Картинка",
      dataIndex: "image",
      key: "image",
      render: (_: unknown, group: ITableGroupItem) => (
        <AdminGroupImage
          className="admin-panel-groups-image"
          src={`/static/${group.image}`}
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
    <>
      <AdminTable
        title="Группы товаров"
        dataSource={dataSource}
        columns={columns}
        updateItem={(row) => handleEditClick(row)}
        deleteItem={(row) => handleDelete(row)}
        createItem={onAddGroup}
      />
      <GroupUpsetModal isOpen={isOpen} />
    </>
  );
};
