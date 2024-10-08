import { useState } from "react";
import Error from "./_error";


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
 
  return (
    <>
      <div><button onClick={err}>error</button></div>

       main page....<br/>
       {test}<br/>
       <img src="peng.jpg" onClick={(err)=>setTest(2000)}/>
      
    </>
  )
}

