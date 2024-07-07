export const MyBankingDetails = () => {

  const MyProps = [
    {
      date: "10.01.2024",
      action: "подписан договор оферты данные зарегистрированы",
      status: "принять договор оферты",
      type: "accepted"
    },
    {
      date: "10.01.2024",
      action: "данные проверены",
      status: "ожидает подтверждения договора оферты",
      type: "pending"
    },
    {
      date: "10.01.2024",
      action: "подписан договор оферты данные зарегистрированы",
      status: "принять договор оферты",
      type: "accepted"
    },
    {
      date: "10.01.2024",
      action: "данные проверены",
      status: "ожидает подтверждения договора оферты",
      type: "pending"
    },
    {
      date: "10.01.2024",
      action: "подписан договор оферты данные зарегистрированы",
      status: "принять договор оферты",
      type: "accepted"

    },
    {
      date: "10.01.2024",
      action: "данные проверены",
      status: "ожидает подтверждения договора оферты",
      type: "pending"
    },
    {
      date: "10.01.2024",
      action: "редактирование реквизитов",
      status: "в обработке",
      type: "in progress"
    },


  ]

  const getColor = (type: string) => {
    switch (type) {
      case 'accepted':
        return '#B9E2A6';
      case 'pending':
        return '#B0C0D8';
      case 'in progress':
        return '#EACDA2';
      default:
        return 'black';
    }
  };
  return (
    <div className="lk__banking-details">
      {/*first section */}
      <div className="lk__banking-first-part">
        <div className="lk__banking-user">
          <div>
            <span>Админов Админ Админович</span>
          </div>
          <div className="lk__banking-user__edit-section">
            <img src="/images/icons/edit.svg" alt="" />
            <span>Редактировать</span>
          </div>
        </div>
        <div className="lk__banking-fisrt-part-details">
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>тып:</span>
              <p>test</p>
            </div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>день рождения:</span>
              <p>test</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>телефон:</span>
              <p>test</p>
            </div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>Email:</span>
              <p>test</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>адрес регистрации:</span>
              <p>test</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>Документ:</span>
              <p>test</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>реквизиты:</span>
              <p>test</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <span>Статус:</span>
              <p>test</p>
            </div>
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="lk__banking-second-part">
        <div className="lk__info-table">
          <span style={{ fontSize: "22px" }}>История изменений</span>
          <div className="lk__table-wrapper">
            <table className="lk__table">
              <thead>
                <tr className="lk__table-item">
                  <th>Дата</th>
                  <th>Действия</th>
                  <th>Статус </th>
                </tr>
              </thead>
              <tbody>
                {MyProps.map((item, index) => {
                  return (
                    <tr className="lk__table-item" key={index}>
                      <td>{item.date}</td>
                      <td >
                        <b>{item.action}</b>
                      </td>
                      <td className="lk__table-item__table-desc" >
                        <span style={{ color: getColor(item.type) }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}