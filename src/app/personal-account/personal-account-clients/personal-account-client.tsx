import { IPersonalAccountClient } from '../../types'
import moment from 'moment'

interface IPersonalAccountClientProps {
  client: IPersonalAccountClient
}
export const PersonalAccountClient = ({
  client
}: IPersonalAccountClientProps) => {
  return (
    <tr className='lk__table-item'>
      <td className='lk__table-profile'>
        <p>{`${client.lastName} ${client.name}`}</p>
        <span>{`ID: ${client.referralId}`}</span>
      </td>
      <td>{moment(client.createdAt).format('DD.MM.YYYY')}</td>
      <td><a href={`mailto:${client.email}`}>{client.email}</a>  </td>
      <td><a href={`tel:${client.phone.replace(/[\s()-]/g, '')}`}>{client.phone}</a>  </td>
    </tr>
  )
}
