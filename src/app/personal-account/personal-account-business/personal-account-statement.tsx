import { StatementFinances } from "./statement-finances"
import { StatementHeader } from "./statement-header"
import { StatementTable } from "./statement-table"

export const PersonalAccountStatement = () => {
  return <div className="lk__wrapper">
    <StatementHeader />
    <div className="lk__statement-table-container">
      <StatementTable />
      <StatementFinances />
    </div>
  </div>
}