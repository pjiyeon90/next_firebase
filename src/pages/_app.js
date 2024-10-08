import Header from "@/component/Header";
import "@/styles/globals.css";
import { Suspense } from "react";

//헤더를 공통으로 쓰려면 _app.js써줘야한다.
export default function App({ Component, pageProps }) {
  return (
  <>
  <Header/> 
  <Suspense fallback={<div>준비중...</div>}>
  <Component {...pageProps} />
  </Suspense>
  </>
  )
}
