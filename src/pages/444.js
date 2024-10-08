//pages -> not-found.js

import { useRouter } from 'next/router';
import React from 'react'

const Notfound = () => {
  const router = useRouter();
  
  function back(){
    console.log(router);
    // router.push('/'); 홈으로 가기
    router.back(); //바로 뒤로가기
  }
  return (
    <>
    <div>해당 페이지를 찾을 수 없습니다.</div>
    <button onClick = {back}>뒤로 가기</button>
    </>
  )
}

export default Notfound