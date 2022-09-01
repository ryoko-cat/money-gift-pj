import type { NextPage } from 'next'
import { useState } from "react";
import { useRouter } from "next/router";

const Payment: NextPage = (userInfo) =>{
    // const [ amount, setAmount] = useState()
    const [ token, setToken] = useState("")
    return (
        <>
        <div  className="payment-container">
            <h2>登録完了しました！<br />ありがとうございます！</h2>
            <p>ご祝儀もこのサイトで受け付けています</p>
            <p>以下に入力いただければ幸いです☺</p>
            <div className='aboutAmount'>
                <form>
                    <label>ご祝儀</label>
                    <br />
                    <input type="number" value={userInfo.payAmount} readOnly></input> 円
                    {/* valueの値をデータベースから引っ張ってくる */}
                    <br />
                    <label>アクセストークン</label>
                    <br />
                    <input type="text" value={token} onChange={(e)=> setToken(e.target.value)}></input>
                    <br />
                    <button type='submit'>決定</button>
                </form>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps({ params }: any) { //データベースから取ってきてる
    const id = params.id;
    const res = await fetch(`http://localhost:3000/1`);
    const userInfo = await res.json();
    console.log(userInfo);
    return { props: { userInfo } };
  }

export default Payment