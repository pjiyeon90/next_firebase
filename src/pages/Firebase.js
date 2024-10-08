import { db, storage } from '@/lib/firebase';
import React, { useEffect, useRef, useState } from 'react'
import { deleteObject, ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { collection, doc, getDocs, getDoc, addDoc, setDoc, deleteDoc } from "firebase/firestore"; 
import Image from 'next/image';

const Firebase = () => {
  let [preview, setPreview] = useState();
  let [loading, setLoading] = useState(false);
  let [imgUrl, setImgUrl] = useState([]);

  let fileEle=useRef();

  function pre(e){
    let file = new FileReader();
    file.readAsDataURL( e.target.files[0] )

    file.onload = (e)=>{
      setPreview(e.target.result)
    }
  }

  function save(e){
    e.preventDefault();
    const file = e.target.photo.files[0];
    let storageRef = ref(storage, file.name); //storage에 file.name으로 저장하겠다.

    setLoading(true);
    uploadBytes(storageRef, file) //저장 uploadBytes 
    .then(res=>{
      setLoading(false);   
      setPreview('');
    })   
  }

  function getImages(){
    //listAll은 모든것을 다 가져오겠다.
    listAll( ref(storage) )
    .then(async (res)=>{

      let url = [];      

      for(let i=0; i<res.items.length; i++){
        let name = res.items[i].name;

        url.push(
           { name, url:await getDownloadURL( res.items[i] )}
        )
      }
      
      setImgUrl(url);

    })

  };

  function delImage(name){

    setLoading(true);
    
    deleteObject( ref(storage, name) )
    .then(res=>{
      setLoading(false);
      getImages();
    })

  }


  return (
    <>
    <div>
      <div>이미지 미리보기</div>
      
      <div className='preview'>        
        <img src={preview} />
        <button onClick={()=>fileEle.current.click()}>카메라아이콘</button>
      </div>

      <form onSubmit={save}>  
        <input 
        style={{display:'none'}}
        ref={fileEle} 
        type="file" name="photo" onChange={pre} multiple />
        <button>저장</button>
      </form>

      {
        loading &&
        <div className='loading'><img src="./loading.gif"/></div>
      }


      <h2>
        Firebase Storage 가져오기
        <button onClick={getImages}>리스트</button>
      </h2>

      <ul className='firebase-list'>
      {
        imgUrl.map((item)=>
          <li>
            <figure><img src={item.url}/></figure>
            <button onClick={()=>delImage(item.name)}>삭제</button>
          </li>
        )
      }
      </ul>

    </div>

    <Firestore setLoading={setLoading}/>
    </>
  )
}

export default Firebase


export function Firestore({setLoading}){
  
  const [data, setData] = useState([]); //useState 안에 초기값을[](빈 배열)로 두면 오류가 안남
  const [mode, setMode] = useState(true); //true는 글쓰기, false는 수정하기
  const [update, setUpdate] = useState({
    name: '', subject:'', content: '', url:'', 
  }); //true는 글쓰기, false는 수정하기

  const updateFn = (edit)=>{
    // {subject:e.target.value}
    // {name:e.target.value}
    // {content:e.target.value}
    
    setUpdate(
      {...update, ...edit}
    )
  }


  const crud = {
    get: async () =>{
      const querySnapshot = await getDocs(collection(db, "test"));

      let dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push( {id: doc.id, ...doc.data() } )//...을 쓰는 이유는 데이터값만 쏙 빼오기 위해
       
      });
      setData(dataArray);
    },
    post: async (e) =>{
      e.preventDefault(); //액션으로 넘어가는 것 방지
      let formdata = new FormData(e.target); //몽땅 넣기
      setLoading(true);

      //파일 업로드 (storage)
      const file = e.target.file. files[0];
      const fileName = 'board/' + file.name;

      const storageRef = ref(storage, fileName) //이름만 가지고는 어디껀지 모르니까 'board/'
      await uploadBytes(storageRef, file)//uploadBytes(저장 위치, 파일), 파일 업로드
      
      const fileUrl = await getDownloadURL(storageRef);

      //db
      formdata.append('date', '2024-09-27'); // 날짜 기입
      formdata.append('url', fileUrl);
      formdata.append('fileName',fileName)

     let obj = Object.fromEntries(formdata);//오브젝트 형태로 보기 가능
     delete obj.file;
     await addDoc(collection(db, 'test'),obj)  // 매개변수 2개(콜렉션 이름, 추가할 내용)
     await crud.get();

    e.target.reset();
    setLoading(false);

    },
    put: async (e) =>{
      e.preventDefault(); //새로고침 막아주기

      console.log(update.file);
      
      if(update.file){
      //storage
      const file = update.file;
      const fileName = 'board/' + file.name;

      const storageRef = ref(storage, fileName) //
      await uploadBytes(storageRef, file)// 파일 업로드
      
      const fileUrl = await getDownloadURL(storageRef); // url 빼오기
      
      let set = {...update};
      set.fileName = fileName;
      set.url = fileUrl;

      delete set.file;
      await setDoc(doc(db, 'test', update.id), set);  
    
       }
       else{
        let set = {...update};
        await setDoc(doc(db, 'test', update.id), set);  
       }
    },
    delete: async(item) =>{
      setLoading(true)
      await deleteDoc(doc(db, 'test', item.id))
      await deleteObject(ref(storage, item.fileName))
      await crud.get();
      setLoading(false);
    }
  }
  console.log(update)
  
  useEffect(()=>{
    crud.get();
  },[])
 

  return(
    <div>
      <h2> No-Sql 활용</h2>
      <article>
        <h3>글쓰기</h3>
        {
          mode ? (
            <div>
              <form onSubmit={crud.post}>
                <p><input type="text" name="subject"></input></p>
                <p><input type="text" name="name"></input></p>
                <p><textarea cols="50" rows="10" name='content'></textarea></p>
                <p><input type="file" name="file"></input></p>
                <p><input type="submit" value="저장"></input></p>
              </form>
          </div>
          ) : (
            <div>
              <form onSubmit={crud.put}>
                <p><input type="text" name="subject"
                    defaultValue={update.subject}
                    onChange={(e)=>updateFn({ subject:e.target.value} )} /> </p>
                
                <p><input type="text" name="name"
                    defaultValue={update.name}
                    onChange={(e)=>updateFn({ name:e.target.value} )} /> </p>
                
                <p><textarea cols="50" rows="10" name='content'
                    defaultValue ={update.content} 
                    onChange={(e)=>updateFn({ content:e.target.value} )}>
                    </textarea></p>

                <p><input type="file" name="file"
                    onChange={(e)=>updateFn({ file:e.target.files[0]} )} /> </p>

                <p><input type="submit" value="수정하기"></input></p>
              </form>
          </div>
          )
        }
          
      </article>

      <h3>리스트</h3>
      <ul className='listwrap'>
        {
          data.map((item)=>
            <li key = {item.id}>
               <img src={item.url} width={80} height={80} alt={item.name}/>
               <div>
               <span>{item.name}</span>
               <span>{item.subject}</span>
               <span>{item.content}</span>
               <span>{item.date}</span>

               <button onClick={()=>{
                setMode(false);
                setUpdate(item);          
               }}>수정</button> 
               <button onClick={()=>crud.delete(item)}>삭제</button>
               </div> 

            </li>
          )
        }
      </ul>
    </div>
  )
}
