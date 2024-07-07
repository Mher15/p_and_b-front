import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useDeleteDocumentFileMutation } from "../../../features/api/documents-api-slice";

interface IDocumentUploaderProps {
  setSelectedDocumentFile: (fileName: string) => void;
  selectedDocumentsFile?: string;
}

export const DocumentUploader = ({
  setSelectedDocumentFile,
  selectedDocumentsFile,
}: IDocumentUploaderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [deleteDocumentFile] = useDeleteDocumentFileMutation();

  const handleChange: UploadProps["onChange"] = (
    fileInfo: UploadChangeParam<UploadFile>
  ) => {
    setFileList(fileInfo.fileList);
    const file = fileInfo.file;

    if (file?.status === "done") {
      const fileName: string = file.response.url;

      setSelectedDocumentFile(fileName);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const fileName: string = file.response?.url;
    if (fileName) {
      try {
        deleteDocumentFile(fileName);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
    setSelectedDocumentFile("");
    setFileList([]);
  };

  useEffect(() => {
    const list: UploadFile[] = selectedDocumentsFile
      ? [
          {
            uid: "-1",
            name: selectedDocumentsFile,
            status: "done",
            url: `/static/${selectedDocumentsFile}`,
            response: { url: selectedDocumentsFile },
          },
        ]
      : [];

    setFileList(list);
    return () => {
      setFileList([]);
    };
  }, [selectedDocumentsFile]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  return (
    <Upload
      action={`${import.meta.env.VITE_API_URL}/api/documents/add`}
      fileList={fileList}
      listType="picture-card"
      onChange={handleChange}
      onRemove={handleRemove}
      accept="application/pdf"
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );
};
