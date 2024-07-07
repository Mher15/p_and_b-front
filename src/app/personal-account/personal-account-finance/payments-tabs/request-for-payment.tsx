import { SetStateAction, useState } from "react";
import "../../../scss/blocks/_payments.scss";
import HistoryTable from "./history-table";

const paymentInfo = {
  price: "360,00",
  ye: 10,
  fullName: "Чепур Виктория Руслановна",
};

const tableHeaders = ["Дата подачи заявки", "Период", "ФИО", "Сумма", "Акт", "Акт с подписью", "Статус", "Комментарий"]

const tableData = [
  {
    id: 1,
    date: "09.11.2021",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "39 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 2,
    date: "08.11.2021",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 3,
    date: "08.09.2022",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 4,
    date: "08.09.2022",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 5,
    date: "08.09.2022",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 5,
    date: "08.09.2022",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  },
  {
    id: 6,
    date: "08.09.2022",
    period: "Октябрь 2021",
    fullName: "Чепур Виктория Руслановна",
    sum: "30 350,00",
    status: "Выплаты получены",
    comments: []
  }
]

export const RequestForPayment = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isExpired, setIsExpired] = useState(false);
  const [total, setTotal] = useState("");
  const [filterData, setFilterData] = useState({
    display: "",
    sumFrom: "",
    sumTo: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterFormChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleTotalChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTotal(e.target.value);
  };

  const handleSendPaymentRequest = () => {
    console.log("total", total);
    setTotal("");
  };

  return (
    <div className="requestForPayments">
      {isExpired ? (
        <div className="paymentExpiredStatus">
          В текущем периоде срок подачи заявки на выплаты истек. Заявку можно
          подать с начала нового периода
        </div>
      ) : (
        <div className="submitApplication">
          <div className="paymentInfo">
            <p>Доступно к выплате:</p>
            <div>
              <h3>{paymentInfo.price} ₽</h3>
              <small>{paymentInfo.ye} ye</small>
            </div>
            <button>Подробнее</button>
          </div>
          <div className="paymentForm">
            <div className="paymentFormInfo">
              <div>
                <input type="checkbox" />
                <span>Апрель</span>
              </div>
              <div className="fullName">{paymentInfo.fullName}</div>
            </div>
            <div className="paymentFormInputs">
              <input
                type="text"
                placeholder="Сумма"
                value={total}
                onChange={(e) => handleTotalChange(e)}
              />
              <button onClick={handleSendPaymentRequest} disabled={!total}>
                Подать заявку
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="paySteps">
        <p>
          1. Скачайте и подпишите актю Используйте для подписи только синюю
          пасту
        </p>
        <p>
          2. Отсканированный документ в формате PDF загрузите в окне «Загрузить»
        </p>
        <p>
          3. После изменения статуса на «Одобрено» ожидайте поступления средств
          на ваш расчетный счет в течение 1-5 рабочих дней (срок зависит от
          вашего банка).
        </p>
        <p>4. Получение выплат доступно с 8 по 30/31 число каждого месяца</p>
        <p>
          5. Если статус изменился на «Отклонено»то вам необходимо связаться с
          колл-центром
        </p>
        <p>
          6. Если при попытке подать заявку на получение выплат появилось
          сообщение "Договор оферты будет активирован" с указанием времени
          активации, значит, ваша регистрация как ИП произошла в текущем периоде
          и получение выплат будет доступно со следующего
        </p>
      </div>
      <div className="paymentTable">
        <h2>История</h2>
        <div className="paymentTableFilters">
          <div className="display">
            <label>Oтоброжать:</label>
            <select name="display" onChange={handleFilterFormChange}>
              <option value="50">Последние 50</option>
              <option value="20">Последние 20</option>
              <option value="10">Последние 10</option>
            </select>
          </div>
          <div className="sum">
            <label>Сумма</label>
            <div>
              <input type="text" name="sumFrom" onChange={handleFilterFormChange} value={filterData.sumFrom} placeholder="0"/>
              <div></div>
              <input type="text" name="sumTo" onChange={handleFilterFormChange} value={filterData.sumTo} placeholder="0"/>
            </div>
          </div>
        </div>
        <HistoryTable tableData={tableData} tableHeaders={tableHeaders} />
      </div>
    </div>
  );
};
