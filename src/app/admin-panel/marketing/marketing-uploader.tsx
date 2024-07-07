import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useDeleteImageMutation } from "../../../features/api/images-api-slice";
import { UploadChangeParam } from "antd/es/upload";

interface IMarketingUploaderProps {
  setSelectedMarketingFile: (fileName: string) => void;
  selectedMarketingFile?: string;
}

export const MarketingUploader = ({
  setSelectedMarketingFile,
  selectedMarketingFile,
}: IMarketingUploaderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [deleteImage] = useDeleteImageMutation();

  const handleChange: UploadProps["onChange"] = (
    fileInfo: UploadChangeParam<UploadFile>
  ) => {
    setFileList(fileInfo.fileList);
    const file = fileInfo.file;

    if (file?.status === "done") {
      const fileName: string = file.response.url;

      setSelectedMarketingFile(fileName);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const fileName: string = file.response?.url;
    if (fileName) {
      try {
        deleteImage(fileName);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
    setSelectedMarketingFile("");
    setFileList([]);
  };

  useEffect(() => {
    const list: UploadFile[] = selectedMarketingFile
      ? [
          {
            uid: "-1",
            name: selectedMarketingFile,
            status: "done",
            url: `/static/${selectedMarketingFile}`,
            response: { url: selectedMarketingFile },
          },
        ]
      : [];

    setFileList(list);
    return () => {
      setFileList([]);
    };
  }, [selectedMarketingFile]);

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
