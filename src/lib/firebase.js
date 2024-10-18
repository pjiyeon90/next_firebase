import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDpiPdEHyBo3S6-ncRHpipVV--V57GsaYQ",
  authDomain: "test-dce9e.firebaseapp.com",
  projectId: "test-dce9e",
  storageBucket: "test-dce9e.appspot.com",
  messagingSenderId: "1076196998959",
  appId: "1:1076196998959:web:d25b013aa0f7e4812bebda",
  measurementId: "G-LEB4G2JEMS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app);
export const db = getFirestore(app);


let messaging;
//네비게이터가 언디파인드 타입이 아닐때
if(typeof window !=='undefined' && typeof window.navigator  !== 'undefined'){
  messaging = getMessaging();

}

export const getClientToken = async ()=>{
  const key = 'BLTibJzb1KvNkZeEFvNmdC4e2Ldg2hY9kgpnTWRVh9P31SXIXvfDXwr70PLoGoTXFGohJEiJ39pz5ciHzE3v_W8';
  const currentToken = await getToken(messaging, { vapidKey: key })
  return currentToken;
}