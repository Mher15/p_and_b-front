import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form, FormInstance, Input } from "antd";
import { setSelectedFile } from "../../../features/uploader/uploader-slice";
import TextArea from "antd/es/input/TextArea";
import layout from "antd/es/layout";
import { translate } from "../../translation";
import {
  useAddDocumentMutation,
  useUpdateDocumentMutation,
} from "../../../features/api/documents-api-slice";
import { setIsDocumentModalOpen } from "../../../features/modals/document-modal-slice";
import { IDocument } from "../../types";
import { DocumentUploader } from "./documents-uploader";

interface IProps {
  isOpen: boolean;
}

const clearForm = (form: FormInstance) => {
  const clearedValues = { id: 0, name: "", file: "" };

  form.setFieldsValue(clearedValues);
};

export const DocumentsUpsetModal = ({ isOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const formValues = useAppSelector(
    (state) => state.modals.documentModal.formValues
  );
  const [addDocument] = useAddDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();
  const initialValues = useAppSelector(
    (state) => state.modals.documentModal.formValues
  );

  const [form] = Form.useForm();
  const file = Form.useWatch("file", form);
  const handleClose = () => {
    clearForm(form);
    dispatch(setIsDocumentModalOpen({ isOpen: false }));
    dispatch(setSelectedFile(""));
  };

  if (initialValues.id) {
    form.setFieldsValue(initialValues);
    if (!file) {
      dispatch(setSelectedFile(initialValues.file));
    }
  }

  const handleSubmit = (formValues: IDocument) => {
    if (initialValues.id) {
      updateDocument({ id: initialValues.id, editedDocument: formValues });
    } else {
      addDocument(formValues);
    }
  };

  const onFinish = (formValues: IDocument) => {
    handleSubmit({ ...formValues });
    handleClose();
  };

  const setDocument = (fileName: string) => {
    form.setFieldValue("file", fileName);
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
            {formValues.id
              ? "Редактирование документа"
              : "Добавление документа"}
          </h2>
          <Form
            {...layout}
            form={form}
            name="upset-document"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="name"
              label={translate("document.form.name.label", locale)}
              rules={[
                {
                  required: true,
                  message: translate("document.form.name.error", locale),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label={translate("document.form.description.label", locale)}
            >
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item
              name="file"
              label={translate("document.form.file.label", locale)}
              rules={[
                {
                  required: true,
                  message: translate("document.form.file.error", locale),
                },
              ]}
            >
              <DocumentUploader
                selectedDocumentsFile={formValues.file}
                setSelectedDocumentFile={setDocument}
              />
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
