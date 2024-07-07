import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { IImage } from "../../types";
import { useDeleteProductImageMutation } from "../../../features/api/products-api-slice";

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IImagesUploaderProps {
  setImages: (fileName: string[]) => void;
  selectedImages?: IImage[];
  productId: number;
}

export const ImagesUploader = ({
  setImages,
  selectedImages,
  productId,
}: IImagesUploaderProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [deleteImage] = useDeleteProductImageMutation();

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
    const isAllFilesDone = fileInfo.fileList.every(
      (f: UploadFile) => f.status === "done"
    );
    if (isAllFilesDone) {
      setImages(fileInfo.fileList.map((f: UploadFile) => f.response.url));
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const fileName: string = file.response.url;

    if (fileName) {
      try {
        deleteImage({ fileName, productId });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  useEffect(() => {
    const list: UploadFile[] = selectedImages
      ? selectedImages.map((image: IImage, index: number) => {
          const uploadFile: UploadFile = {
            uid: `${image.file}_${index}`,
            name: image.file,
            status: "done",
            url: `/static/${image.file}`,
            response: { url: image.file },
          };
          return uploadFile;
        })
      : [];

    setFileList(list);
    return () => {
      setFileList([]);
    };
  }, [selectedImages]);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  return (
    <>
      <Upload
        action={`${import.meta.env.VITE_API_URL}/api/products/image`}
        listType="picture-card"
        fileList={fileList}
        accept="image/jpeg,image/png"
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 5 ? null : uploadButton}
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
