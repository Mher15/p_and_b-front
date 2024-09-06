import styled from "styled-components";
import { appRoutes, device } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { translate } from "../../translation";
import { PaymentResult } from "../payment-result";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../loader";
import {
  useFetchOrderQuery,
  useOrderPayMutation,
} from "../../../features/api/order-api-slice";
import { IOrderPaymentResponse, IQueryResponse } from "../../types";
import { clearBasket } from "../../../features/basket/basket-slice";

const StyledMain = styled.main`
  position: relative;
`;

const StyledSection = styled.section`
  padding: 65px 0 150px;

  @media ${device.laptopL} {
    padding: 45px 0 100px;
  }

  @media ${device.mobileL} {
    padding: 80px 0 40px;
  }
`;

export const Payment = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const { orderId: orderIdStr } = useParams();
  const orderId = Number(orderIdStr);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.profile.user);
  const id = user?.id ? user?.id : 0;
  
  
  const { data: order, isLoading: isOrderLoading } =
  useFetchOrderQuery(orderId);
  const [payOrder, { isLoading: isOrderPaymentLoading }] =
  useOrderPayMutation();
  
  const onOrderPay = () => {
    payOrder({ orderId }).then(
      (response: IQueryResponse<IOrderPaymentResponse>) => {
        const { data, error } = response;
        if (error || !data?.result) {
          throw new Error(`Registration failed: ${error}`);
        }
        const { result } = data;
        dispatch(clearBasket());
        navigate(`${appRoutes.HOME}`);
      }
    );

    const url = `${import.meta.env.VITE_API_URL}/api/finance/add`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId:id, vp: order?.productsVolumePrice}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if(data){
          console.log('aaa');
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  if (isNaN(orderId) && isOrderLoading && isOrderPaymentLoading)
    return <Loader />;

  return (
    order && (
      <StyledMain className="main about">
        <StyledSection>
          <PaymentResult
            productsPrice={order.productsPrice}
            deliveryPrice={order.deliveryPrice}
          />
          <button className="btn btn--lg order__btn-order" onClick={onOrderPay}>
            {translate("common.payment", locale)}
          </button>
        </StyledSection>
      </StyledMain>
    )
  );
};
