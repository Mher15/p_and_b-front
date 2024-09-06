import { useEffect, useState } from 'react'
import { useFetchGiftQuery } from '../../../features/api/my-gift-api-slice'
import { useFetchOfficeQuery } from '../../../features/api/user-info-slice'
import { useAppSelector } from '../../hooks'
import { StatementFinances } from './statement-finances'
import { StatementHeader } from './statement-header'
import { StatementTable } from './statement-table'

export const PersonalAccountStatement = () => {
  const user = useAppSelector(state => state.profile.user)
  const id = user?.id ? user?.id : 0
  const { data: gift } = useFetchGiftQuery(id)
  const { data: office } = useFetchOfficeQuery(id)
  const [finance,setFinance] = useState()


  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/finance/get`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId:id}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if(data){
          setFinance(data)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className='lk__wrapper'>
      <StatementHeader />
      <div className='lk__statement-table-container'>
        <StatementTable gift={gift} office={office} finance= {finance} />
        <StatementFinances gift={gift}  finance= {finance}/>
      </div>
    </div>
  )
}
