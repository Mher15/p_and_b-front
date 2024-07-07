import { useAppDispatch, useAppSelector } from "../../hooks";
import { IFormBrand } from "../../types";
import { Form, FormInstance, Input } from "antd";
import {
  useAddBrandMutation,
  useUpdateBrandMutation,
} from "../../../features/api/brand-api-slice";
import { setSelectedFile } from "../../../features/uploader/uploader-slice";
import { setIsBrandModalOpen } from "../../../features/modals/brand-modal-slice";
import { FileUploader } from "../../components/form/file-uploader";
import TextArea from "antd/es/input/TextArea";
import layout from "antd/es/layout";
import { translate } from "../../translation";

interface IProps {
  isOpen: boolean;
}

const clearForm = (form: FormInstance) => {
  const clearedValues = { id: 0, name: "", image: "" };

  form.setFieldsValue(clearedValues);
};

export const BrandUpsetModal = ({ isOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const [addGroup] = useAddBrandMutation();
  const [updateGroup] = useUpdateBrandMutation();
  const selectedFile = useAppSelector((state) => state.uploader.selectedFile);
  const initialValues = useAppSelector(
    (state) => state.modals.brandModal.formValues
  );

  const [form] = Form.useForm();

  const handleClose = () => {
    clearForm(form);
    dispatch(setSelectedFile(""));
    dispatch(setIsBrandModalOpen({ isOpen: false }));
  };
  if (initialValues.id) {
    form.setFieldsValue(initialValues);
    if (!selectedFile) {
      dispatch(setSelectedFile(initialValues.image));
    }
  }

  const handleSubmit = (formValues: IFormBrand) => {
    if (initialValues.id) {
      updateGroup({ id: initialValues.id, editedBrand: formValues });
    } else {
      addGroup(formValues);
    }
  };

  const onFinish = (formValues: IFormBrand) => {
    handleSubmit({ ...formValues, image: selectedFile });
    handleClose();
  };

  return (
    <article className={`modal ${isOpen ? "open" : ""}`}>
      <button
        className="btn--reset components__close modal__close"
        onClick={handleClose}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L1 9"></path>
          <path d="M9 9L1 1"></path>
        </svg>
      </button>
      <div
        className={"modal__curtain modal__curtain--login active"}
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">
            {initialValues.id ? "Редактирование бренда" : "Создание бренда"}
          </h2>
          <Form
            {...layout}
            form={form}
            name="upset-brand"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="name"
              label={translate("brand.form.create.name.label", locale)}
              rules={[
                {
                  required: true,
                  message: translate("brand.form.create.name.error", locale),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label={translate("brand.form.create.description.label", locale)}
            >
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item name="image" label="Картинка" valuePropName="fileList">
              <FileUploader imagesCount={1} accept="image/jpeg,image/png" />
            </Form.Item>

            <div className="form-fotter">
              <button className="btn btn--lg" type="submit">
                {translate("common.save", locale)}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </article>
  );
};
