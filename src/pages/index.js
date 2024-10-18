import { useState } from "react";
import Error from "./_error";
import { getClientToken } from "@/lib/firebase";


export default function Home() {

  const [test, setTest] = useState(1000);
  const [error, setError] = useState();

  function err(){
    // fetch('/api/hello')
    // .then(res=> res.json())
    // .then(res=>{
    //   console.log(res)
    // })
    fetch('http://aaaa.com')
    .catch((e)=>{
      setError(e)
    })
};

  if (error) return <Error statusCode = {error}/> 

  //fcm 토큰 발행
  async function clientToken(){
    const token = await getClientToken();

    console.log(token);

    //비동기 방식 작동, 사용자의 상태 체크 가능
  //   Notification.requestPermission() 
  //   .then(permission =>{
  //     console.log(permission,'사용자 권한 상태....')
  //   })
  // }
  }
 
  return (
    <>
      <div><button onClick={err}>error</button></div>

       main page....<br/>
       {test}<br/>
       <img src="peng.jpg" onClick={(err)=>setTest(2000)}/>

      <article>
        <h2>구독하기(FCM)</h2>
        <button onClick={clientToken}>구독하기</button>
      </article>

      
    </>
  )
}

