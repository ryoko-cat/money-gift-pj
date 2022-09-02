import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from "next/link";


export async function getServerSideProps() {
    const res= await fetch("http://localhost:4000")
    const users= await res.json()
    console.log(users)
    // ページコンポーネントにpropsとしてに渡す
    return {
        props: {
            users,
        },
    }
    }
  
  
    export default function Name({users}: any) {
      const router = useRouter();
      console.log(router.query);
      const persons = users.filter((user):any =>user.name === Number(router.query.name));
      console.log(persons)
      console.log(persons.map((person): any => person.payAmount))
      return (
        <>
        <h1 className="thanks">ありがとうございます！</h1>
        {/* <h2>商品{router.query.name}のページです</h2> */}
        <div>
          {persons.map((person:any, index:any) => {
            return(
            <div key={index}>
              <h2 >{person.payAmount}円のご祝儀を受け付けました！</h2>
            </div>
              )
          })}
        </div>
      </>
      );
    }