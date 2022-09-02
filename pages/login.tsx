import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/list') // TODO遷移先に変更
    } catch (err) {
      alert("メールアドレスまたはパスワードが間違っています")
    }
  }

  return (
    <div className='login-cont'>
      <form className="login-form" onSubmit={logIn}>
        <div>
          <label htmlFor="email">
            Email:{' '}
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:{' '}
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login