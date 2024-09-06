import WarningIcon from '../../../../public/images/icons/warning-icon.svg'

interface props {
  gift: any
  office: any
  finance:any
}

export const StatementTable = ({ gift, office,  finance }: props) => {
  return (
    <div className='statement-container'>
      <div className='statement-bloks'>
        <div>
          <p>
            ЛО<span>{office?.lo ? office?.lo : 0}</span>
          </p>
        </div>
        <div>
          <p>
            ГО<span>{office?.go ? office?.go : 0}</span>
          </p>
        </div>
        <div>
          <p>
            ОТ<span>{office?.ot ? office?.ot : 0}</span>
          </p>
        </div>
      </div>
      <div className='statement-table'>
        <div>
          <div className='table-blocks'>
            <div>
              <div className='block-header'>
                <p>
                  <b>Gift</b> (Подарочный счет)
                  <img src={WarningIcon} alt='warning icon' />
                </p>
              </div>
              <div className='block-info'>
                <div>
                  <p>
                    <b>{finance?.gift ? finance?.gift : 0} ₽</b>
                  </p>
                  <span>{finance?.giftUe ? finance?.giftUe : 0} y.e.</span>
                </div>
              </div>
            </div>
            <div>
              <div className='block-header'>
                <p>
                  <b>
                    Счет <br />
                    Возногрождений
                  </b>
                  <img src={WarningIcon} alt='warning icon' />
                </p>
              </div>
              <div className='block-info'>
                <div>
                  <p>
                    <b>{finance?.rewardAccount ? finance?.rewardAccount : 0} ₽</b>
                  </p>
                  <span>
                    {finance?.rewardAccountUe ? finance?.rewardAccountUe : 0} y.e.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='table-content'>
            <div className='table-header'>
              <div className='left-table'>
                <table>
                  <thead>
                    <tr>
                      <th> Вознаграждения </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gift?.state?.map((elm: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            <b> {elm.title} </b>
                            {elm.info}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className='right-table'>
                <table>
                  <thead>
                    <tr>
                      <th>УЕ</th>
                      <th>Валюта страны</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gift?.state?.map((elm: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            <b> {elm.ue}</b>{' '}
                          </td>
                          <td>
                            <b> {elm.price}</b>{' '}
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
      </div>
    </div>
  )
}
