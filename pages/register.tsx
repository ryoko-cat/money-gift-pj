import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'


const Register: NextPage = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  // const [zipCode, setZipCode] = useState<string>('')
  const [adress, setAdress] = useState<string>('')
  const [tel, setTel] = useState<string>('')
  const [payAmount, setPayAmount] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [accountId, setAccountId] = useState<string>('')

  const form = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name === '' || adress === '' || tel === '' || payAmount === '' || token === '') return
    const body = {
      name: name,
      adress: adress,
      tel: tel,
      payAmount: Number(payAmount),
      token: token,
      accountId: accountId
    };
    console.log(JSON.stringify(body))
    await fetch("http://localhost:4000", { // TODO:expressの接続先に変更
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
  }

  return (
    <div className='register-container'>
      <div className='intro'>
        <h1>WeGiftへようこそ！</h1>
        <p>アプリのご利用ありがとうございます！<br />こちらでご祝儀のお手配をお願いします！</p>
        <p>住所・名前・電話番号、銀行情報、ご祝儀額を入力後、ボタンを押してください☺</p>
      </div>
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
        <div className="item">
          <label htmlFor="name">
            銀行アカウントのID:
          </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
        <div className="item">
          <label htmlFor="payAmount">
            ご祝儀額:
          </label>
          <span>
            <input
              id="payAmount"
              type="number"
              onChange={(e) => setPayAmount(e.target.value)}
            />円</span>
        </div>
        <div className="item">
          <label htmlFor="token">
            アクセストークン:
          </label>
          <input
            id="token"
            type="text"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button className="btn" type="submit" onClick={() => router.push("/thanks")}>
          登録する
        </button>
      </form>
      <Image alt="imagePic" 
             src='/22970299.jpg'
             width={200}
             height={200} />
      <div className='couple'>
        <p>Kazuto Sunaba</p>
        <p>Mizue Yamazaki</p>
      </div>
    </div>
  )
}

export default Register