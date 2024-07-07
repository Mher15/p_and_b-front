import { useAppDispatch, useAppSelector } from "../../hooks";
import { IFormProduct } from "../../types";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../../features/api/products-api-slice";
import { setIsProductModalOpen } from "../../../features/modals/product-modal-slice";
import { ProductUpsertForm } from "./upset-form";
import { Form, FormInstance } from "antd";

interface IProps {
  isOpen: boolean;
}

const clearForm = (form: FormInstance) => {
  const clearedValues = {
    id: 0,
    groups: [],
    brand: { id: 0, name: "", image: "" },
    name: "",
    description: "",
    shortDescription: "",
    methodOfAdministration: "",
    price: 0,
    vopPrice: 0,
    images: [],
    tags: [],
    sku: 0,
    utility: "",
    compound: "",
    documents: [],
    discount: 0,
    weight: 0,
    barCode: 0,
    key: "",
  };

  form.setFieldsValue(clearedValues);
};

export const ProductUpsetModal = ({ isOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const initialValues = useAppSelector(
    (state) => state.modals.productModal.formValues
  );
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [form] = Form.useForm();

  const handleClose = () => {
    clearForm(form);
    dispatch(setIsProductModalOpen({ isOpen: false }));
  };

  const handleSubmit = (formValues: IFormProduct) => {
    if (initialValues.id) {
      updateProduct({ id: initialValues.id, editedProduct: formValues });
    } else {
      addProduct(formValues);
    }
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
            {initialValues.id ? "Редактирование товара" : "Создание товара"}
          </h2>
          <ProductUpsertForm
            form={form}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};
