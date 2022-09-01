import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'


const Register: NextPage = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  // const [zipCode, setZipCode] = useState<string>('')
  const [adress, setAdress] = useState<string>('')
  const [tel, setTel] = useState<string>('')
  const [payAmount, setPayAmount] = useState<string>('')
  const [token, setToken] = useState<string>('')

  const form = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name === '' || adress === '' || tel === '' || payAmount === '' || token === '') return
    const body = {
      name: name,
      adress: adress,
      tel: tel,
      payAmount: payAmount
    };
    await fetch(apiurl, { // TODO:expressの接続先に変更
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': '*',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(error => {
        console.error(error)
      })
    setName('')
    // setZipCode('')
    setAdress('')
    setTel('')
    setPayAmount('')
    setToken('')
    router.push('/payment') // TODO登録後の遷移先
  }

  return (
    <div>
      <form className="form" onSubmit={form}>
        <div className="item">
          <label htmlFor="name">
            お名前:
          </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="item">
          <label htmlFor="adress">
            郵便番号・ご住所:
          </label>
          <input
            id="adress"
            type="text"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className="item">
          <label htmlFor="tel">
            お電話番号:
          </label>
          <input
            id="tel"
            type="tel"
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="payAmount">
            ご祝儀額:
          </label>
          <span>
            <input
              id="payAmount"
              type="text"
              onChange={(e) => setPayAmount(e.target.value)}
            />円</span>
        </div>
        <div>
          <label htmlFor="token">
            アクセストークン:
          </label>
          <input
            id="token"
            type="text"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button type="submit">
          登録する
        </button>
      </form>
    </div>
  )
}

export default Register