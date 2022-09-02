import type { NextPage } from 'next'
import Image from 'next/image'
import Register from './register'


// export async function getServerSideProps({ params }: any) { //データベースから取ってきてる
//     const res = await fetch(`http://express-type:4000`);
//     const userInfos = await res.json();
//     console.log(userInfos);
//     return { props: { userInfos } };
//   }

const Thanks: NextPage = (props: any) =>{
    // // const [ amount, setAmount] = useState()
    // const [ token, setToken] = useState("")
    // const router = useRouter();
    // console.log(router.query);
    // const items = userInfos.filter(userInfo =>userInfo.id === Number(router.query.id))

    return (
        <>
        <div  className="thanks-container">
            <div className='greet'>
                <h2>登録完了しました！<br />ありがとうございます！</h2>
                <Image alt="weddingPic"
                       src="/1368957.jpg"
                       width={700}
                       height={500} />   
                <p>楽しい式になる予定です！</p>
                <p>当日まで楽しみにしていてください☺</p>
            </div>
        </div>
        </>
    )
}
export default Thanks