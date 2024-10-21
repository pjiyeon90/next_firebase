//ApiTest.js
import React from 'react'

const ApiTest = ({data}) => {

  // console.log(data);
  
  let test = {
    post: async ()=>{
      await fetch('/api/hello',{
        method:'post',
        body:JSON.stringify({name:'홍길동'})
      })
    }, 
    update: async ()=>{},
    delete: async ()=>{
      await fetch('/api/hello?name=홍길동', {method:'delete'})
    }
  }

   return (
    <div>
      <h2>ApiTest</h2>
        <div>
          <button onClick={test.post}>추가</button>
          <button>수정</button>
          <button onClick={test.delete}>삭제</button>
        </div>
        <ul>
          {
            data.map((obj,key)=>
              <li key={key}> {obj.name} </li>
             )
          }
          </ul>  
    </div>
  )
}
//useEffect로 data를 불러왔는데 getServerSideProps()로도 API 데이터를 불러올 수 있다.
export async function getServerSideProps(){
  // let a = await Promise (async (reserve, reject)=>{     -> Promise는 두개의 매개 변수 사용 / reserve:성공시, reject:데이터 업로드 실패시
  //   const res = await fetch('http://localhost:3000/api/hello')
  //   const data = await res.json(); //문자로 넘어오기 때문에 object 형태로 변환해서 받는다.

  //   return {props:{data:a}}
  // })

    const res = await fetch('http://localhost:3000/api/hello')
    const data = await res.json(); //문자로 넘어오기 때문에 object 형태로 변환해서 받는다.

    return {props:{data}}
}

export default ApiTest
