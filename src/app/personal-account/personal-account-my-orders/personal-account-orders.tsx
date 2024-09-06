import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PersonalAccountOrders = () => {
  const [data, setData] = useState({
    value1: '',
    value2: ''
  })

  const validateFormData = () => {
    return Object.values(data).every(val => val)
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const date = `${year}-${month}-${day}`

  const [history, setHistory] = useState([
    {
      id: 1,
      data: '07.06.2021',
      document: 'Внутренний',
      coming: '67,00 y.e.',
      consumption: '0,00 y.e.'
    },
    {
      id: 2,
      data: '07.06.2021',
      document: ' TRV => ONE',
      coming: '250,00 y.e.',
      consumption: '0,00 y.e.'
    },
    {
      id: 3,
      data: '07.06.2021',
      document: 'Внутренний ',
      coming: '0,00 y.e.',
      consumption: '200,00 y.e.'
    },
    {
      id: 4,
      data: '07.06.2021',
      document: 'Внутренний ',
      coming: '67,00 y.e.',
      consumption: '87,00 y.e.'
    },
    {
      id: 5,
      data: '12.05.2021',
      document: 'Внутренний ',
      coming: '260,481 y.e.',
      consumption: '0,00 y.e.'
    },
    {
      id: 6,
      data: '08.05.2021',
      document: 'средств',
      coming: '0,00 y.e.',
      consumption: '1 366,98 y.e.'
    }
  ])

  const [defaultFromDate, setDefaultFromDate] = useState('')
  const [defaultToDate, setDefaultToDate] = useState('')
  const [cloneHistory, setCloneHistory] = useState(history)

  const dateFilter = (fromDate:any, toDate:any) => {
    const from = fromDate ? moment(fromDate).startOf('day').toDate() : null
    const to = toDate ? moment(toDate).endOf('day').toDate() : null

    setCloneHistory(
      history.filter(item => {
        const itemDate = moment(item.data, 'DD.MM.YYYY').toDate()
        return (!from || itemDate >= from) && (!to || itemDate <= to)
      })
    )
  }

  // Handle input changes
  const handleFromDateChange = (e:any) => {
    const value = e.target.value
    setDefaultFromDate(value)
    dateFilter(value, defaultToDate)
  }

  const handleToDateChange = (e:any) => {
    const value = e.target.value
    setDefaultToDate(value)
    dateFilter(defaultFromDate, value)
  }

  return (
    <>
      <div className='lk__history'>
        
        <div className='history-date'>
          <input
            type='date'
            value={defaultFromDate}
            onChange={handleFromDateChange}
            className='inp'
          />
          <p>-</p>
          <input
            type='date'
            value={defaultToDate}
            onChange={handleToDateChange}
            className='inp'
          />
          <div
          className='sbros'
            onClick={() => {
              setDefaultFromDate('')
              setDefaultToDate('')
              dateFilter('', '')
            }}
          >
            Сброс
          </div>
        </div>
      </div>
      <div className='lk__tb'>
        <table>
          <thead>
            <tr>
              <th>№ заказа</th>
              <th>Дата</th>
              <th>Сумма заказа</th>
              <th>Оплата</th>
              <th>Отгрузка</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {cloneHistory.map((elm:any, i:number) => (
              <tr key={i}>
                <td className='tdDoc'>{elm.data}</td>
                <td >
                  <Link to={''}>{elm.document}</Link>
                </td>
                <td>{elm.coming}</td>
                <td>{elm.coming}</td>
                <td>{elm.coming}</td>
                <td className='tdDoc'>{elm.consumption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PersonalAccountOrders;
