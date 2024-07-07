import { Breadcrumbs } from "../components/breadcrumbs";
import { useAppSelector } from "../hooks";
import {
  IOrderCreate,
  IOrderCreateResponse,
  IOrderFormValues,
  IQueryResponse,
} from "../types";
import { OrderForm } from "../components/order-form/order-form";
import { translate } from "../translation";
import { OrderResult } from "../components/order-form/order-result";
import {
  orderProductsSelector,
  totalPriceWithoutDiliverySelector,
  totalVolumePriceSelector,
} from "../selectors/order";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../constants";
import { useAddOrderMutation } from "../../features/api/order-api-slice";
import { Loader } from "../components/loader";

export const OrderPage = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const deliveryPrice = useAppSelector((state) => state.order.deliveryPrice);
  const orderProducts = useAppSelector(orderProductsSelector);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const productsPrice = useAppSelector(totalPriceWithoutDiliverySelector);
  const productsVolumePrice = useAppSelector(totalVolumePriceSelector);
  const [addOrder, { isLoading: isNewOrderLoading }] = useAddOrderMutation();

  if (isNewOrderLoading) return <Loader />;

  const onFinish = (formValues: IOrderFormValues) => {
    if (!user) return;

    const newOrder: IOrderCreate = {
      ...formValues,
      products: orderProducts,
      productsPrice,
      deliveryPrice,
      productsVolumePrice,
      price: deliveryPrice + productsPrice,
    };

    addOrder({ order: newOrder, userId: user.id }).then(
      (response: IQueryResponse<IOrderCreateResponse>) => {
        const { data, error } = response;
        if (error || !data?.orderId) {
          throw new Error(`Registration failed: ${error}`);
        }
        const { orderId } = data;

        navigate(`${appRoutes.PAYMENT_PAGE}/${orderId}`);
      }
    );
  };

  return (
    <main className="main invoice-page">
      <Breadcrumbs />
      <section className="invoice-page__section order">
        <div className="container">
          <h1 className="title invoice-page__title">
            {translate("order.title", locale)}
          </h1>
          <div className="invoice-page__wrapper">
            <OrderForm onFinish={onFinish} form={form} />
            <OrderResult form={form} />
          </div>
        </div>
      </section>
    </main>
  );
};
