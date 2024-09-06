import { Select } from "antd";
import { useFetchGiftAmountQuery } from "../../../features/api/personal-account-api-slice";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { IDate } from "../../types";
import { useState } from "react";
import moment from "moment";

export const GiftAccountInfo = ({ data, order,finance }: any) => {
  const user = useAppSelector((state) => state.profile.user);
  const referralId = user?.referralId || "0";
  const { data: giftAmount = 0 } = useFetchGiftAmountQuery(referralId);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthe = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = `${year}-${monthe}`;

  const month = [
    {
      id: 1,
      value: `${year}-01`,
      name: "Январь 2024",
    },
    {
      id: 2,
      value: `${year}-02`,
      name: "Февраль 2024",
    },
    {
      id: 3,
      value: `${year}-03`,
      name: "Март 2024",
    },
    {
      id: 4,
      value: `${year}-04`,
      name: "Апрель 2024",
    },
    {
      id: 5,
      value: `${year}-05`,
      name: "Май 2024",
    },
    {
      id: 6,
      value: `${year}-06`,
      name: "Июнь 2024",
    },
    {
      id: 7,
      value: `${year}-07`,
      name: "Июль 2024",
    },
    {
      id: 8,
      value: `${year}-08`,
      name: "Август 2024",
    },
    {
      id: 9,
      value: `${year}-09`,
      name: "Сентябрь 2024",
    },
    {
      id: 10,
      value: `${year}-10`,
      name: "Октябрь 2024",
    },
    {
      id: 11,
      value: `${year}-11`,
      name: "Ноябрь 2024",
    },
    {
      id: 12,
      value: `${year}-12`,
      name: "Декабрь 2024",
    },
  ];
  const transactionStype = [
    {
      id: 1,
      name: "Все операции",
      value: "all",
    },
    {
      id: 2,
      name: "Поступления",
      value: "inCome",
    },
    {
      id: 3,
      name: "Списания",
      value: "outCome",
    },
  ];
  const monthOptions = month.map((month: IDate) => ({
    value: month.value,
    label: month.name,
  })).filter((item: any) =>item.value <= yearMonth );
  
  const transactionOptions = transactionStype.map(
    (transactionStype: IDate) => ({
      value: transactionStype.value,
      label: transactionStype.name,
    })
  );

  const handleMonthChange = (value: any) => {
    setSelectedMonth(value);
  };

  const handleTransactionTypeChange = (value: any) => {
    setSelectedTransactionType(value);
  };
const filteredGifts = order?.filter((item: any) => {
    const itemDate = moment(item.createdAt).format("YYYY-MM");
    const monthMatch = selectedMonth ? itemDate === selectedMonth : true;
    const typeMatch =
      selectedTransactionType && selectedTransactionType !== "all"
        ? item.type === selectedTransactionType
        : true;
    return monthMatch && typeMatch;
  });
  
  if (!user) return <NotFound />;
  return (
    <>
      <div className="lk__balance">
        <div className="lk__balance-info">
          <div>
            <span>Доступно</span>
          </div>
          <div className="lk__balance-info__balance-block">
            <span className="lk__balance-info__balance-price">
              {finance?.availableGift ? finance?.availableGift : 0} Р
            </span>
            <span className="lk__balance-info__balance-price-sub">
              {finance?.availableGiftUe ? finance?.availableGiftUe : 0} УЕ
            </span>
          </div>
        </div>
        <div className="lk__balance-filters">
          <div>
            <span>Период:</span>
            <Select
              style={{ width: "150px" }}
              defaultValue={"10.01.2024"}
              options={monthOptions}
              onChange={handleMonthChange}
            />
          </div>
          <div>
            <span>Тип операции:</span>
            <Select
              style={{ width: "150px" }}
              options={transactionOptions}
              defaultValue={"all"}
              onChange={handleTransactionTypeChange}
            />
          </div>
        </div>
        <div className="lk__info-table">
          <div className="lk__table-wrapper">
            <table className="lk__table">
              <thead>
                <tr className="lk__table-item">
                  <th>Дата</th>
                  <th>Основание</th>
                  <th>Сумма </th>
                </tr>
              </thead>
              <tbody>
                {filteredGifts &&
                  filteredGifts?.map((item:any, index:any) => {
                    return (
                      <tr className="lk__table-item" key={index}>
                        <td>{moment(item?.createdAt).format("DD.MM.YYYY")}</td>
                        <td className="lk__table-item__table-desc">
                          <b> оплата заказа № {item?.paymentId}</b>
                        </td>
                        <td>{item?.price}Р</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="lk__excel-btn-div">
            <button className="btn btn--sm">Скачать Excel</button>
          </div>
        </div>
      </div>
    </>
  );
};
