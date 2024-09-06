import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAppSelector } from "../../hooks";

export const PersonalAccountTransactions = () => {
  const [finance, setFinance] = useState<any>();
  const myUser = useAppSelector((state) => state.profile.user);
  const [tab, setTab] = useState(1);
  const id = myUser?.id ? myUser?.id : 0;
  const [data, setData] = useState({
    value1: "",
    value2: "",
  });
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
      coming: "260,481 y.e.",
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
  const [defaultFromDate, setDefaultFromDate] = useState("");
  const [defaultToDate, setDefaultToDate] = useState("");
  const [cloneHistory, setCloneHistory] = useState(history);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  const [user, setUser] = useState("");

  console.log("data", data);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/finance/get`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFinance(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      const url1 = `${import.meta.env.VITE_API_URL}/api/finance/get-transfer`;
      fetch(url1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setFinance(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, []);

  const validateFormData = () => {
    return Object.values(data).every((val) => val);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    const regex = /^\d{3}-\d{7}$/;

    if (regex.test(value)) {
      fetch(`${import.meta.env.VITE_API_URL}/api/user/${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(`${data.name} ${data.lastName}`);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          setUser("");
        });
    } else {
      console.log("Invalid format");
      setUser("");
    }
  };

  const dateFilter = (fromDate: any, toDate: any) => {
    const from = fromDate ? moment(fromDate).startOf("day").toDate() : null;
    const to = toDate ? moment(toDate).endOf("day").toDate() : null;

    setCloneHistory(
      history.filter((item) => {
        const itemDate = moment(item.data, "DD.MM.YYYY").toDate();
        return (!from || itemDate >= from) && (!to || itemDate <= to);
      })
    );
  };

  const performTranslation = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/finance/transfer-of-funds`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        toUserId: data.value1,
        price: data.value2,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFinance(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFromDateChange = (e: any) => {
    const value = e.target.value;
    setDefaultFromDate(value);
    dateFilter(value, defaultToDate);
  };

  const handleToDateChange = (e: any) => {
    const value = e.target.value;
    setDefaultToDate(value);
    dateFilter(defaultFromDate, value);
  };

  return (
    <>
      <div className="lk__transactions">
        <div className="left-box">
          <p>для перевода доступно:</p>
          <h1>
            {finance?.availableRewardAccount
              ? finance?.availableRewardAccount
              : 0}{" "}
            ₽
          </h1>
          <p>
            {finance?.availableRewardAccountUe
              ? finance?.availableRewardAccountUe
              : 0}{" "}
            УЕ
          </p>
        </div>
        <div className="right-box">
          <div className="userInfo">
            <input
              type="text"
              placeholder="ID партнера"
              onChange={handleInputChange}
              name="value1"
            />
            <small>{user}</small>
          </div>
          <input
            type="text"
            placeholder="сумма перевода"
            onChange={handleInputChange}
            name="value2"
          />
          <button
            // disabled={!validateFormData()}
            onClick={() => performTranslation()}
          >
            Выполнить перевод
          </button>
        </div>
      </div>
      <div className="lk__history">
        <div className="history-title">
          <h3>История переводов</h3>
        </div>
        <div className="history-date">
          <input
            type="date"
            value={defaultFromDate}
            onChange={handleFromDateChange}
            className="inp"
          />
          <p>-</p>
          <input
            type="date"
            value={defaultToDate}
            onChange={handleToDateChange}
            className="inp"
          />
          <div
            onClick={() => {
              setDefaultFromDate("");
              setDefaultToDate("");
              dateFilter("", "");
            }}
          >
            Сброс
          </div>
        </div>
      </div>
      <div className="lk__tb">
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Документоснование</th>
              <th>Приход</th>
              <th>Расход</th>
            </tr>
          </thead>
          <tbody>
            {cloneHistory.map((elm, i) => (
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
      </div>
    </>
  );
};
