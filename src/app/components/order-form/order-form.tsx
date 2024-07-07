import { Form, FormInstance } from "antd";
import { IOrderFormValues } from "../../types";
import TextArea from "antd/es/input/TextArea";
import { translate } from "../../translation";
import { DeliveryBlock } from "./delivery-block";
import { RecipientDetails } from "./recipient-details-block";
import { useAppSelector } from "../../hooks";

interface IOrderFormProps {
  onFinish: (values: IOrderFormValues) => void;
  form: FormInstance;
}

const initialValues = {
  deliveryCountry: "",
  deliveryCity: "",
  deliveryAddress: "",
  deliveryMethod: "",
  lastName: "",
  name: "",
  patronymic: "",
  phone: "",
  email: "",
  comment: "",
};

export const OrderForm = ({ onFinish, form }: IOrderFormProps) => {
  const locale = useAppSelector((state) => state.profile.locale);

  return (
    <Form
      className="invoice-page__content"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <DeliveryBlock form={form} />
      <RecipientDetails locale={locale} />
      <div className="order__block">
        <Form.Item
          name="comment"
          label={translate("group.form.create.comment.label", locale)}
        >
          <TextArea
            className="form__input form__input--area order__textarea"
            placeholder="Комментарий к заказу"
            rows={5}
          />
        </Form.Item>
        <button className="btn btn--lg order__btn-order" type="submit">
          {translate("order.createOrder", locale)}
        </button>
      </div>
    </Form>
  );
};
