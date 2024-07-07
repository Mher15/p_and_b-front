import { IGroup, IBrand, IFormProduct, IProduct, IDocument } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useFetchGroupsQuery } from "../../../features/api/groups-api-slice";
import { useFetchBrandsQuery } from "../../../features/api/brand-api-slice";
import { Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PageLayout } from "../../components/layouts";
import { translate } from "../../translation";
import { TagsInputs } from "./tags-inputs";
import { setIsProductModalOpen } from "../../../features/modals/product-modal-slice";
import styled from "styled-components";
import { CompoundUploader } from "./compound-uploader";
import { ImagesUploader } from "./images-uploader";
import type { GetRef } from "antd";
import { useFetchDocumentsQuery } from "../../../features/api/documents-api-slice";

const StyledLabel = styled.span`
  white-space: break-spaces;
`;

type FormInstance = GetRef<typeof Form>;
interface IProductUpsertFormProps {
  initialValues: IProduct;
  onSubmit: (values: IFormProduct) => void;
  form: FormInstance;
}

export const ProductUpsertForm = ({
  initialValues,
  onSubmit,
  form,
}: IProductUpsertFormProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: groups = [] } = useFetchGroupsQuery();
  const { data: brands = [] } = useFetchBrandsQuery();
  const { data: documents = [] } = useFetchDocumentsQuery();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  if (initialValues.id) {
    form.setFieldsValue({
      ...initialValues,
      groups: initialValues.groups.map((group) => group.id),
      brand: initialValues.brand.id,
      documents: initialValues.documents.map((document) => document.id),
      tags: (initialValues.tags || []).map((tag) => tag.name),
    });
  }

  const onFinish = (formValues: IFormProduct) => {
    onSubmit(formValues);
    dispatch(setIsProductModalOpen({ isOpen: false }));
    form.resetFields();
  };

  const groupOptions = groups.map((group: IGroup) => ({
    value: group.id,
    label: group.name,
  }));

  const brandOptions = brands.map((brand: IBrand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const documentOptions = documents.map((document: IDocument) => ({
    value: document.id,
    label: document.name,
  }));

  const setCompound = (compoundFileName: string) => {
    form.setFieldValue("compound", compoundFileName);
  };

  const setImages = (images: string[]) => {
    form.setFieldValue("images", images);
  };

  const formValues = form.getFieldsValue();

  return (
    <PageLayout>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name="upset-product"
        onFinish={onFinish}
        style={{ maxWidth: 600, zIndex: 10113 }}
      >
        <Form.Item
          name="name"
          label={translate("product.form.name.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.name.error", locale),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={translate("product.form.tags.label", locale)}>
          <TagsInputs />
        </Form.Item>
        <Form.Item
          label={translate("product.form.group.label", locale)}
          name="groups"
          rules={[
            {
              required: true,
              message: translate("product.form.group.error", locale),
            },
          ]}
        >
          <Select
            mode="multiple"
            options={groupOptions}
            dropdownStyle={{ zIndex: 100500 }}
          />
        </Form.Item>
        <Form.Item
          label={translate("product.form.brand.label", locale)}
          name="brand"
          rules={[
            {
              required: true,
              message: translate("product.form.brand.error", locale),
            },
          ]}
        >
          <Select options={brandOptions} dropdownStyle={{ zIndex: 100500 }} />
        </Form.Item>

        <Form.Item
          name="shortDescription"
          label={translate("product.form.shortDescription.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.shortDescription.error", locale),
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="description"
          label={translate("product.form.description.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.description.error", locale),
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="utility"
          label={translate("product.form.utility.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.utility.error", locale),
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="methodOfAdministration"
          label={
            <StyledLabel>
              {translate("product.form.methodOfAdministration.label", locale)}
            </StyledLabel>
          }
          rules={[
            {
              required: true,
              message: translate(
                "product.form.methodOfAdministration.error",
                locale
              ),
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="compound"
          label={
            <StyledLabel>
              {translate("product.form.compound.label", locale)}
            </StyledLabel>
          }
          rules={[
            {
              required: true,
              message: translate("product.form.compound.error", locale),
            },
          ]}
        >
          <CompoundUploader
            selectedCompoundFile={formValues.compound}
            setSelectedCompoundFile={setCompound}
          />
        </Form.Item>
        <Form.Item
          name="documents"
          label={translate("product.form.document.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.document.error", locale),
            },
          ]}
        >
          <Select
            mode="multiple"
            options={documentOptions}
            dropdownStyle={{ zIndex: 100500 }}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label={translate("product.form.price.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.price.error", locale),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="vopPrice"
          label={translate("product.form.vopPrice.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.vopPrice.error", locale),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="weight"
          label={translate("product.form.weight.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.weight.error", locale),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="barCode"
          label={translate("product.form.barCode.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.barCode.error", locale),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="discount"
          label={translate("product.form.discount.label", locale)}
        >
          <InputNumber placeholder="50" />
        </Form.Item>
        <Form.Item
          name="images"
          label={translate("product.form.images.label", locale)}
          rules={[
            {
              required: true,
              message: translate("product.form.images.error", locale),
            },
          ]}
        >
          <ImagesUploader
            selectedImages={formValues.images}
            setImages={setImages}
            productId={initialValues.id}
          />
        </Form.Item>
        <div className="form-fotter">
          <button className="btn btn--lg" type="submit">
            {translate("common.save", locale)}
          </button>
        </div>
      </Form>
    </PageLayout>
  );
};
