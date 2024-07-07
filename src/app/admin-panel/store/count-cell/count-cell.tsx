import { Input } from "antd";
import { changeStoreItem } from "../../../../features/store/store-slice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IStoreItem } from "../../../types";
import { ChangeEvent } from "react";
import { isNumber } from "lodash";

interface IProps {
  storeItem: IStoreItem;
}

export const CountCell = ({ storeItem }: IProps) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.store.rows);
  const changedStoreItem = store.find(
    (item) => item.product.id === storeItem.product.id
  );
  const count = changedStoreItem?.count || storeItem.count;

  const minus = () => {
    if (count > 0) {
      dispatch(changeStoreItem({ ...storeItem, count: count - 1 }));
    }
  };
  const plus = () => {
    dispatch(changeStoreItem({ ...storeItem, count: count + 1 }));
  };
  const handleCoutChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCount = Number(event.target.value);
    if (!isNumber(inputCount)) return;

    dispatch(changeStoreItem({ ...storeItem, count: inputCount }));
  };

  return (
    <div className="components__count invoice-page__count-inner">
      <button className="components__count-minus" onClick={minus}></button>
      <Input value={count} onChange={handleCoutChange} />
      <button className="components__count-plus" onClick={plus}></button>
    </div>
  );
};
