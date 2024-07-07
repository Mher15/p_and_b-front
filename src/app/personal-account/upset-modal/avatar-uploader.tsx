import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useDeleteImageMutation } from "../../../features/api/images-api-slice";
import { UploadChangeParam } from "antd/es/upload";

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IAvatarUploaderProps {
  setSelectedAvatar: (fileName: string) => void;
  selectedAvatar?: string;
}

export const AvatarUploader = ({
  selectedAvatar,
  setSelectedAvatar,
}: IAvatarUploaderProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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

  const handleChange: UploadProps["onChange"] = (
    fileInfo: UploadChangeParam<UploadFile>
  ) => {
    setFileList(fileInfo.fileList);

    const file = fileInfo.fileList[0];
    if (file?.status === "done") {
      const fileName: string = fileInfo.file.response.url;

      setSelectedAvatar(fileName);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const fileName: string = file.name;

    if (fileName) {
      try {
        deleteImage(fileName);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    setSelectedAvatar("");
    setFileList([]);
  };

  useEffect(() => {
    const list: UploadFile[] = selectedAvatar
      ? [
          {
            uid: "-1",
            name: selectedAvatar,
            status: "done",
            url: `/static/${selectedAvatar}`,
          },
        ]
      : [];
    setFileList(list);
    return () => {
      setFileList([]);
    };
  }, [selectedAvatar]);

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
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        accept="image/jpeg,image/png"
      >
        {fileList.length >= 1 ? null : uploadButton}
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
