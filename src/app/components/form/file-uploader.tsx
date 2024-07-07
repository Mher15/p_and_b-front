import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { setSelectedFile } from "../../../features/uploader/uploader-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useDeleteImageMutation } from "../../../features/api/images-api-slice";

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IFileUploaderProps {
  imagesCount: number;
  accept?: string;
}

export const FileUploader = ({ imagesCount, accept }: IFileUploaderProps) => {
  const dispatch = useAppDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const selectedFile = useAppSelector((state) => state.uploader.selectedFile);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [deleteImage] = useDeleteImageMutation();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as Blob);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    setFileList(info.fileList);

    const file = info.fileList[0];
    if (file?.status === "done") {
      dispatch(setSelectedFile(info.file.response.url));
    }
  };

  const handleRemove = async () => {
    if (selectedFile) {
      try {
        deleteImage(selectedFile);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    dispatch(setSelectedFile(""));
    setFileList([]);
  };

  useEffect(() => {
    const list: UploadFile[] = selectedFile
      ? [
          {
            uid: "-1",
            name: selectedFile,
            status: "done",
            url: `/static/${selectedFile}`,
          },
        ]
      : [];
    setFileList(list);
    return () => {
      setFileList([]);
    };
  }, [selectedFile]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  return (
    <>
      <Upload
        action={`${import.meta.env.VITE_API_URL}/api/images`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        accept={accept}
      >
        {fileList.length >= imagesCount ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        zIndex={11500}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
