import { AdminTable } from "../../components/admin-table/admin-table";
import { Loader } from "../../components/loader/loader";
import { DocumentsUpsetModal } from "./upset-modal";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { translate } from "../../translation";
import { IDocument } from "../../types";
import {
  useDeleteDocumentMutation,
  useFetchDocumentsQuery,
} from "../../../features/api/documents-api-slice";
import { setIsDocumentModalOpen } from "../../../features/modals/document-modal-slice";

interface ITableDocumentItem {
  id: number;
  name: string;
  file: string;
  key: string;
}

export const AdminDocuments = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const isOpen = useAppSelector((state) => state.modals.documentModal.isOpen);
  const { data = [], isLoading } = useFetchDocumentsQuery();
  const onAddDocument = () =>
    dispatch(setIsDocumentModalOpen({ isOpen: true }));

  const [deleteDocument] = useDeleteDocumentMutation();

  if (isLoading) return <Loader />;

  const handleEditClick = (item?: ITableDocumentItem) => {
    dispatch(
      setIsDocumentModalOpen({ isOpen: true, formValues: item as IDocument })
    );
  };

  const dataSource: ITableDocumentItem[] = data.map((dataItem) => ({
    ...dataItem,
    key: String(dataItem.id),
  }));

  const handleDelete = (item: ITableDocumentItem) => deleteDocument(item);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: translate("common.name", locale),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate("common.description", locale),
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <>
      <AdminTable
        title="Документы"
        dataSource={dataSource}
        columns={columns}
        updateItem={(row) => handleEditClick(row)}
        deleteItem={(row) => handleDelete(row)}
        createItem={onAddDocument}
      />
      <DocumentsUpsetModal isOpen={isOpen} />
    </>
  );
};
