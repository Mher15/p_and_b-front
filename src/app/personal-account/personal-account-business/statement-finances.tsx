import StarIcon from '../../../../public/images/icons/star.svg'
import WarningIcon from '../../../../public/images/icons/warning-icon.svg'

export const StatementFinances = ({ gift,finance }: any) => {
  return (
    <div className='main-finances'>
      <div className='ambassador'>
        <div className='white-block'>
          <p>{gift?.marketing?.mentorBonusLevel}</p>
          <hr />
          <p>{gift?.abusador1}</p>
          <img src={StarIcon} alt='star' />
        </div>
        <div className='statement-block-title'>
          <p>Амбассадор</p>
          <img src={WarningIcon} alt='warning icon' />
        </div>
        <div className='white-block'>
          <p>{gift?.marketing?.rewardsLevel}</p>
          <hr />
          <p>{gift?.abusador2}</p>
          <img src={StarIcon} alt='star' />
        </div>
      </div>
      <div className='statement-finances'>
        <div className='statement-finances-header'>Финансы</div>
        <div className='finance-blocks'>
          <div>
            <div>Gift (Подарочный счет)</div>
            <div>{finance?.availableGift?finance?.availableGift: 0} ₽</div>
          </div>
          <div>
            <div>Счет возногрождений</div>
            <div>{finance?.availableRewardAccount} ₽</div>
          </div>
          <div>
            <div>С начала 2024</div>
            <div>{gift?.forYear ? Math.round(gift?.forYear) : 0} ₽</div>
          </div>
          <div>
            <div>Всего в Best & People</div>
            <div>{gift?.forAllTyme ? Math.round(gift?.forAllTyme) : 0} ₽</div>
          </div>
        </div>
      </div>
    </div>
  )
}
