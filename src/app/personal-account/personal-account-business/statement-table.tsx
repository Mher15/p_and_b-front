import WarningIcon from "../../../../public/images/icons/warning-icon.svg";

export const StatementTable = () => {
  const data = [
    { name: `Gift за ЛО`, bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
    { name: "Gift за ЛО", bonus: "(60 VP -47%)" },
  ];
  const data2 = [
    { ue: "28,2", count: "987 " },
    { ue: "192 ", count: "18 550 " },
    { ue: "600 ", count: "26 978 " },
    { ue: "25,1 ", count: "8 400 " },
    { ue: "28,2 ", count: "14 000 " },
    { ue: "28,2 ", count: "7000 " },
    { ue: "28,2 ", count: "21 875 " },
    { ue: "28,2 ", count: "52 500 " },
    { ue: "28,2 ", count: "1 260 000 " },
  ];
  return (
    <div className="statement-container">
      <div className="statement-bloks">
        <div>
          <p>
            ЛО<span>3145,5 PV</span>
          </p>
        </div>
        <div>
          <p>
            ГО<span>7199,8 PV</span>
          </p>
        </div>
        <div>
          <p>
            ОТ<span>8199,8 PV</span>
          </p>
        </div>
      </div>
      <div className="statement-table">
        <div>
          <div className="table-blocks">
            <div>
              <div className="block-header">
                <p>
                  <b>Gift</b> (Подарочный счет)
                  <img src={WarningIcon} alt="warning icon" />
                </p>
              </div>
              <div className="block-info">
                <div>
                  <p>
                    <b>19 537,0 ₽</b>
                  </p>
                  <span>558,2 y.e.</span>
                </div>
              </div>
            </div>
            <div>
              <div className="block-header">
                <p>
                  <b>
                    Счет <br />
                    Возногрождений
                  </b>
                  <img src={WarningIcon} alt="warning icon" />
                </p>
              </div>
              <div className="block-info">
                <div>
                  <p>
                    <b>1 385 503 ₽</b>
                  </p>
                  <span>39 585,8 y.e.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="table-content">
            <div className="table-header">
              <div className="left-table">
                <table>
                  <thead>
                    <tr>
                      <th> Вознаграждения </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((elm, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <b> {elm.name} </b>
                            {elm.bonus}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="right-table">
                <table>
                  <thead>
                    <tr>
                      <th>УЕ</th>
                      <th>Валюта страны</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2.map((elm, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <b> {elm.ue}</b> УЕ{" "}
                          </td>
                          <td>
                            <b> {elm.count}</b> Р{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
