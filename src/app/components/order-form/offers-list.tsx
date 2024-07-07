import { Form, FormInstance, Radio } from "antd";
import { useFetchOffersInfoQuery } from "../../../features/api/delivery-api-slice";
import { translate } from "../../translation";
import styled from "styled-components";
import moment from "moment";
import { useAppSelector } from "../../hooks";

const OffersListContainer = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
`;

const OffersListContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const OfferSpan = styled.span`
  white-space: nowrap;
`;

interface IOffersListProps {
  form: FormInstance;
}

export const OffersList = ({ form }: IOffersListProps) => {
  const locale = useAppSelector((state) => state.profile.locale);

  const countryId = Form.useWatch("deliveryCountry", form);
  const cityId = Form.useWatch("deliveryCity", form);
  const deliveryAddress = Form.useWatch("deliveryAddress", form);

  const { data: offers = [], isLoading } = useFetchOffersInfoQuery(
    {
      countryId,
      cityId,
      deliveryAddress,
    },
    { skip: !countryId || !cityId || !deliveryAddress }
  );

  return (
    <div className="order__block">
      <OffersListContainer>
        <h2 className="title title--sm order__title">
          {translate("order.deliveryOfferChoose", locale)}
        </h2>
        {!isLoading && (
          <>
            <div className="order__radios">
              <Form.Item
                name="offer"
                rules={[
                  {
                    required: true,
                    message: translate("order.deliveryMethod.error", locale),
                  },
                ]}
              >
                <Radio.Group className="order__radios" value="youSelf">
                  <OffersListContent>
                    {offers.map((offer) => {
                      return (
                        <Radio key={`${offer.from}-${offer.to}`} value={offer}>
                          <OfferSpan>
                            {`${moment(offer.from).format(
                              "DD.MM.YYYY"
                            )} ${moment(offer.from).format("hh:mm")}-${moment(
                              offer.to
                            ).format("hh:mm")}`}
                          </OfferSpan>
                        </Radio>
                      );
                    })}
                  </OffersListContent>
                </Radio.Group>
              </Form.Item>
            </div>
          </>
        )}
      </OffersListContainer>
    </div>
  );
};
