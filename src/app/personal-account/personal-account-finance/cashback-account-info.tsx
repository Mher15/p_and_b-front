import { Select } from "antd";
import { useFetchCashbackAmountQuery } from "../../../features/api/personal-account-api-slice";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { IDate } from "../../types";
import { useState } from "react";

export const CashbackAccountInfo = () => {
  const user = useAppSelector((state) => state.profile.user);
  const referralId = user?.referralId || "0";
  const { data: cashbackAmount = 0 } = useFetchCashbackAmountQuery(referralId);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState(null);
  const month = [
    {
      id: 1,
      value: "10.01.2024",
      name: "Январь 2024",
    }
  ]
  const transactionStype = [
    {
      id: 1,
      name: "Все операции",
      value: "all"
    },
    {
      id: 2,
      name: "Поступления",
      value: "inCome"
    },
    {
      id: 3,
      name: "Списания",
      value: "outCome"
    }
  ]
  const monthOptions = month.map((month: IDate) => ({
    value: month.value,
    label: month.name,
  }));
  const transactionOptions = transactionStype.map((transactionStype: IDate) => ({
    value: transactionStype.value,
    label: transactionStype.name,
  }));

  const cashBack = [
    {
      date: "10.01.2024",
      base: "оплата заказа № 3431112",
      subBase: "платеж с валютного счета",
      ammount: "-13 830,00 ₽",
      type: "outCome"
    }
  ]

  const handleMonthChange = (value: any) => {
    setSelectedMonth(value);
  };

  const handleTransactionTypeChange = (value: any) => {
    setSelectedTransactionType(value);
  };

  const filteredCashBack = cashBack.filter((item) => {
    const monthMatch = selectedMonth ? item.date === selectedMonth : true;
    const typeMatch = selectedTransactionType ? item.type === selectedTransactionType || selectedTransactionType === "all" : true;
    return monthMatch && typeMatch;
  });
  if (!user) return <NotFound />;
  return (
    <>
      <div style={{ width: "70%" }}>
        <div className="lk__balance-info">
          <div>
            <span>Доступно</span>
          </div>
          <div className="lk__balance-info__balance-block">
            <span className="lk__balance-info__balance-price">35 678 Р</span>
            <span className="lk__balance-info__balance-price-sub">1 019,37 УЕ</span>
          </div>
        </div>
        <div className="lk__balance-filters">
          <div>
            <span>Период:</span>
            <Select
              style={{ width: "150px" }}
              options={monthOptions}
              defaultValue={"10.01.2024"}
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
                {filteredCashBack.map((item, index) => {
                  return (
                    <tr className="lk__table-item" key={index}>
                      <td>{item.date}</td>
                      <td className="lk__table-item__table-desc">
                        <b>{item.base}</b>
                        <span>{item.subBase}</span>
                      </td>
                      <td>
                        {item.ammount}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="lk__excel-btn-div">
            <button className="btn btn--sm">
              Скачать Excel
            </button>
          </div>
        </div>
      </div>
    </>

  );
};
