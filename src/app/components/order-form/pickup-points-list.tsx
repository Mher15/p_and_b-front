import { Form, Radio } from "antd";
import { useFetchPickupPointsListQuery } from "../../../features/api/delivery-api-slice";
import { useState } from "react";
import { translate } from "../../translation";
import { Pagination } from "antd";
import type { FormInstance, PaginationProps } from "antd";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";

const PickupPointsListContainer = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
`;

const PickupPointsListContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

interface IOrderFormProps {
  form: FormInstance;
}

export const PickupPointsList = ({ form }: IOrderFormProps) => {
  const locale = useAppSelector((state) => state.profile.locale);
  const [page, setPage] = useState(1);
  const countryId = Form.useWatch("deliveryCountry", form);
  const cityId = Form.useWatch("deliveryCity", form);

  const { data: pickupPoints = [], isLoading: isPickupPointsListLoading } =
    useFetchPickupPointsListQuery(
      { countryId, cityId },
      { skip: !countryId || !cityId }
    );

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const pageSize = 10;

  return (
    <div className="order__block">
      <PickupPointsListContainer>
        <h2 className="title title--sm order__title">
          {translate("order.deliveryPickupsChoose", locale)}
        </h2>
        {!isPickupPointsListLoading && (
          <>
            <div className="order__radios">
              <Form.Item
                name="destinationStationId"
                rules={[
                  {
                    required: true,
                    message: translate("order.deliveryMethod.error", locale),
                  },
                ]}
              >
                <Radio.Group className="order__radios" value="youSelf">
                  <PickupPointsListContent>
                    {pickupPoints
                      .slice((page - 1) * pageSize, page * pageSize)
                      .map((pickup) => {
                        return (
                          <Radio key={pickup.id} value={pickup.id}>
                            {pickup.address.full_address}
                          </Radio>
                        );
                      })}
                  </PickupPointsListContent>
                </Radio.Group>
              </Form.Item>
              <Pagination
                current={page}
                total={pickupPoints.length}
                showSizeChanger={false}
                showTotal={(total) => `Всего ${total}:`}
                onChange={onChange}
              />
            </div>
          </>
        )}
      </PickupPointsListContainer>
    </div>
  );
};
