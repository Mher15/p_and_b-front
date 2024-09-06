import React, { useState, useEffect } from 'react'

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date()
    const dayOfMonth = 7 // The day the countdown starts each month
    let targetDate

    if (now.getDate() < dayOfMonth) {
      // If today is before the 7th, target date is the 7th of the current month
      targetDate = new Date(now.getFullYear(), now.getMonth(), dayOfMonth)
    } else {
      // If today is on or after the 7th, target date is the 6th of the next month
      targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 6)
    }

    const difference = targetDate.getTime() - now.getTime()

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    }
  }

  const translations = {
    days: 'дней',
    hours: 'часов',
    minutes: 'минут',
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timerComponents: React.ReactNode[] = []

  Object.keys(timeLeft).forEach(interval => {
    timerComponents.push(
      <div key={interval} className='date_container'>
        <div className='date_box'>
          <div>{timeLeft[interval as keyof typeof timeLeft]}</div>
          <div>{translations[interval as keyof typeof translations]}</div>
        </div>
      </div>
    )
  })

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  )
}

export default CountdownTimer
