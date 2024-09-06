import "../../../scss/blocks/_lk.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HistoryTable = ({tableData, tableHeaders}: any) => {
  return (
    <div className="lk__info-table">
      <div className="lk__table-wrapper">
        <table className="lk__table">
          <thead>
            <tr className="lk__table-item">
                {
                    tableHeaders.map((val:string, ind: number) => {
                        return <th key={ind}>{val}</th>
                    })
                }
            </tr>
          </thead>
          <tbody>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tableData.map((data: any) => {
                    const {id, date, period, fullName, sum, status, comments} = data
                  return <tr key={id}>
                    <td>{date}</td>
                    <td>{period}</td>
                    <td>{fullName}</td>
                    <td>{sum}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{status}</td>
                    <td>{}</td>
                  </tr>
                })  
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
