import { ReactNode } from 'react';

export interface ICell {
    fieldName: string,
    component: ReactNode,
}

export interface IRow {
    [key: string]: ReactNode,
}

interface IPropsType {
    columns: ICell[],
    rows: IRow[],
}

export const Table = ({columns, rows}: IPropsType) => {

    return (
        <table >
            <tr >
            {
                columns.map((col)=> (<th key={`header-th-${col.fieldName}`}>{col.component}</th>))
            }
            </tr>
            {
                rows.map((row, rowIndex) => (
                    <tr key={`header-tr-${rowIndex}`}>
                        {
                            columns.map((col)=>(
                                <td key={`header-td-${rowIndex}-${col.fieldName}`}>
                                            {row[col.fieldName]}
                                </td>
                            ))
                        }
                    </tr>
                ))
                
            }
        </table>
    )
}