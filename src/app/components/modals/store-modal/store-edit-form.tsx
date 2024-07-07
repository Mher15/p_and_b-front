import { IBrand, IGroup } from "../../../types";
import { useFetchBrandsQuery } from "../../../../features/api/brand-api-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Form, Input, InputNumber, Select } from "antd";
import { FileUploader } from "../../form/file-uploader";
import { useFetchGroupsQuery } from "../../../../features/api/groups-api-slice";
import TextArea from "antd/es/input/TextArea";
import { setIsProductEditModalOpen } from "../../../../features/modals/product-modal-slice";
import { useUpdateProductMutation } from "../../../../features/api/products-api-slice";

export const ProductEditForm = () => {
  const dispatch = useAppDispatch();
  const formValues = useAppSelector(
    (state) => state.modals.productModal.formValues
  );

  const uploadFiles = [];

  const [updateProductMutation] = useUpdateProductMutation();

  const selectedFile = useAppSelector((state) => state.uploader.selectedFile);
  const { data: groups = [] } = useFetchGroupsQuery();
  const { data: brands = [] } = useFetchBrandsQuery();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const handleSubmit = () => {
    updateProductMutation({ ...formValues, image: selectedFile });
    dispatch(setIsProductEditModalOpen({ isOpen: false }));
  };

  const onFinish = () => {
    handleSubmit();
  };

  const groupOptions = groups.map((group: IGroup) => ({
    value: group.id,
    text: group.name,
  }));
  const brandOptions = brands.map((brand: IBrand) => ({
    value: brand.id,
    text: brand.name,
  }));

  if (formValues) {
    form.setFieldsValue(formValues);
    uploadFiles.push({
      uid: "-1",
      name: formValues.image,
      status: "done",
      url: `/static/${formValues.image}`,
    });
  }

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
      <Form.Item name="groupId" label="Группа" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {groupOptions.map((groupOption) => (
            <Option value={groupOption.value}>{groupOption.text}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="brandId" label="Бренд" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {brandOptions.map((brandOption) => (
            <Option value={brandOption.value}>{brandOption.text}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="methodOfAdministration" label="Способ применения">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="price" label="Цена">
        <InputNumber />
      </Form.Item>
      <Form.Item name="vopPrice" label="Цена vp">
        <InputNumber />
      </Form.Item>
      <FileUploader uploadFiles={uploadFiles} />

      <div className="form-fotter">
        <button className="button" type="submit">
          Сохранить
        </button>
      </div>
    </Form>
  );
};
