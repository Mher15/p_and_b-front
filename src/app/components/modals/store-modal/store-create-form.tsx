import { IProductCreate, IProduct } from "../../../types";
import { useFetchProductsQuery } from "../../../../features/api/products-api-slice";
import { setIsProductCreateModalOpen } from "../../../../features/modals/product-modal-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Form, Input, InputNumber, Select } from "antd";
import { FileUploader } from "../../form/file-uploader";
import { useAddStoreItemMutation } from "../../../../features/api/store-api-slice";

export const StoreCreateForm = () => {
  const dispatch = useAppDispatch();
  const [addToStore] = useAddStoreItemMutation();
  const { data = [] } = useFetchProductsQuery();

  const selectedFile = useAppSelector((state) => state.uploader.selectedFile);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const handleSubmit = (formValues: IProductCreate) => {
    const formData = new FormData();

    formData.append("productId", formValues.productId.toString());
    formData.append("brandId", formValues.brandId.toString());
    formData.append("name", formValues.name.toString());
    formData.append("description", formValues.description.toString());
    formData.append(
      "methodOfAdministration",
      formValues.methodOfAdministration.toString()
    );
    formData.append("price", formValues.price.toString());
    formData.append("vopPrice", formValues.vopPrice.toString());
    formData.append("image", selectedFile);

    addToStore(formData);
    dispatch(setIsProductCreateModalOpen(false));
  };

  const onFinish = (formValues: IProductCreate) => {
    handleSubmit(formValues);
  };

  const productOptions = data.map((product: IProduct) => ({
    value: product.id,
    text: product.name,
  }));

  return (
    <Form
      {...layout}
      form={form}
      name="add-group"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="Название" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="productId" label="Группа" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {productOptions.map((productOption) => (
            <Option value={productOption.value}>{productOption.text}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="count" label="Цена vp">
        <InputNumber />
      </Form.Item>
      <FileUploader />

      <div className="form-fotter">
        <button className="button" type="submit">
          Сохранить
        </button>
      </div>
    </Form>
  );
};
