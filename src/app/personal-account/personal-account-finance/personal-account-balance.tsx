import { useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import { NotFound } from '../../pages/404'
import { CashbackAccountInfo } from './cashback-account-info'
import { GiftAccountInfo } from './gift-account-info'
import { useFetchMyOrdersQuery } from '../../../features/api/orders-api-slice'
import { useFetchGiftQuery } from '../../../features/api/my-gift-api-slice.ts'

export const PersonalAccountBalance = () => {
  const user = useAppSelector(state => state.profile.user)
  const [tab, setTab] = useState(1)
  const id = user?.id ? user?.id : 0
  const { data: gift } = useFetchGiftQuery(id)
  const { data } = useFetchMyOrdersQuery(id)

  const handleChangeTab = (tab: number) => {
    setTab(tab)
  }

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

  

  if (!user) return <NotFound />
  return (
    <div className='tabs product-page__content'>
      <ul className='lk__tabs-controls'>
        <li
          className={`lk__tabs-control ${tab === 1 ? 'active' : ''}`}
          data-tabs-control='true'
        >
          <button className='btn--reset' onClick={() => handleChangeTab(1)}>
            Счёт вознаграждение
          </button>
        </li>
        <li
          className={`lk__tabs-control ${tab === 2 ? 'active' : ''}`}
          data-tabs-control='true'
        >
          <button className='btn--reset' onClick={() => handleChangeTab(2)}>
            Подарочный счёт
          </button>
        </li>
      </ul>
      <div
        className={`lk__tabs-content ${tab === 1 ? 'active' : ''}`}
        data-tabs-content='true'
      >
        <CashbackAccountInfo data={gift} order={data} finance = {finance} />
      </div>
      <div
        className={`lk__tabs-content ${tab === 2 ? 'active' : ''}`}
        data-tabs-content='true'
      >
        <GiftAccountInfo data={gift} order={data} finance = {finance} />
      </div>
    </div>
  )
}
