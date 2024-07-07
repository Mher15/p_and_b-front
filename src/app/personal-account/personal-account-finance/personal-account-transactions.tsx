import { useState } from "react";
import { Link } from "react-router-dom";

export const PersonalAccountTransactions = () => {
  const [data, setData] = useState({
    value1: "",
    value2: "",
  });
  const validateFormData = () => {
    return Object.values(data).every((val) => val);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [history, setHistory] = useState([
    {
      id: 1,
      data: "07.06.2021",
      document: "Внутренний перевод средств",
      coming: "67,00 y.e.",
      consumption: "0,00 y.e.",
    },
    {
      id: 2,
      data: "07.06.2021",
      document: "Перевод средств: TRV => ONE",
      coming: "250,00 y.e.",
      consumption: "0,00 y.e.",
    },
    {
      id: 3,
      data: "07.06.2021",
      document: "Внутренний перевод средств",
      coming: "0,00 y.e.",
      consumption: "200,00 y.e.",
    },
    {
      id: 4,
      data: "07.06.2021",
      document: "Внутренний перевод средств",
      coming: "67,00 y.e.",
      consumption: "87,00 y.e.",
    },
    {
      id: 5,
      data: "12.05.2021",
      document: "Внутренний перевод средств",
      coming: "260,481 y.e. ",
      consumption: "0,00 y.e.",
    },
    {
      id: 6,
      data: "08.05.2021",
      document: "Внутренний перевод средств",
      coming: "0,00 y.e.",
      consumption: "1 366,98 y.e.",
    },
  ]);

  return (
    <>
      <div className="lk__transactions">
        <div className="left-box">
          <p> для перевода доступно:</p>
          <h1>3 407,00 ₽</h1>
          <p>97,34 УЕ</p>
        </div>
        <div className="right-box">
          <input
            type="text"
            placeholder="ID партнера"
            onChange={handleInputChange}
            name="value1"
          />
          <input
            type="text"
            placeholder="сумма перевода"
            onChange={handleInputChange}
            name="value2"
          />
          <button disabled={!validateFormData()}>Выполнить перевод</button>
        </div>
      </div>
      <div className="lk__history">
        <div className="history-title">
          <h3>История переводов</h3>
        </div>
        <div className="history-date">
          <input type="date" className="inp" />
          <p>-</p>
          <input type="date" className="inp" />
          <p>Отображать:</p>
          <select name="" id=""></select>
        </div>
      </div>
      <table className="lk__tb">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Документоснование</th>
            <th>Приход</th>
            <th>Расход</th>
          </tr>
        </thead>
        <tbody>
          {history.map((elm, i) => (
            <tr key={i}>
              <td>{elm.data}</td>
              <td className="tdDoc">
                <Link to={""}>{elm.document}</Link>
              </td>
              <td>{elm.coming}</td>
              <td>{elm.consumption}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
