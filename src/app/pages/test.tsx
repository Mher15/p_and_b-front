import React from 'react'
import axios from 'axios'

const Test = () => {
  const test = async () => {
    const url = 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2e6d8089-000f-5000-9000-133c765f0dd4' 
    const bearerToken = 'g8o95kC4YDseXpMODr92BCJMN1_4AD4nGCgBEScYMdPo'

    const body = {
      amount: {
        value: '10.00',
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://p-and-b-front.vercel.app/'
      },
      capture_mode: 'AUTOMATIC',
      description: 'Test payment'
    }

    // Perform the POST request
    axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Payment created successfully:', response.data)
      })
      .catch(error => {
        console.error(
          'Error creating payment:',
          error.response ? error.response.data : error.message
        )
      })
  }
test()
  return <div>test</div>
}

export default Test
