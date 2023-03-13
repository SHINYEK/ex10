import React, { useEffect, useRef, useState } from 'react'
import {app} from '../firebase'
import {getFirestore,doc,setDoc,getDoc} from 'firebase/firestore'
import {getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage'


const MyPage = ({history}) => {
    const [file,setFile] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const ref_file = useRef(null);
    const [form,setForm] = useState({
        email:sessionStorage.getItem('email'),
        name:'홍길동',
        address:'인천 서구 경서동',
        phone:'010-0000-0000',
        photo:''
    })

    const{email,name,address,phone,photo} = form;
    const [image,setImage] = useState("https://via.placeholder.com/120X150") 


    const onRead = async() =>{
       const user = await getDoc(doc(db,'users',email));
       console.log(user.data())
    //    if(user.data().name!=="" || user.data().phone!=="" || user.data().address!==""){
        setForm(user.data())
        setImage(user.data().photo)
    }

    useEffect(()=>{
        onRead();
    },[])

    const onChangeFile = (e) =>{
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        console.log(file);
    }


    const onSubmit = async(e) =>{
        e.preventDefault();
        if(!window.confirm("수정하시겠습니까?"))return;
        //이미지 업로드 - 이미지가 있는 경우
        let url = "";
        if(file !== null){
          const result = await uploadBytes(ref(storage,`images/${Date.now()}_${file.name}`),file)
          url = await getDownloadURL(result.ref);
        }
       await setDoc(doc(db,'users',email),{
        ...form,
         photo:url
       })
        history.push('/');       
      }

      
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div style={{margin: '0px auto', textAlign:'center'}}>
        <h1>마이페이지🙍‍♀️</h1>
        <form className='page' onSubmit={onSubmit}>
            <input type="text" placeholder='이름' value={name} name='name' onChange={onChange}/>
            <input type="text" placeholder='주소' value={address} name='address' onChange={onChange}/>
            <input type="text" placeholder='전화번호' value={phone} name='phone' onChange={onChange}/>
           <img src={image||"https://via.placeholder.com/120X150"} style={{width:'40%'}} onClick={()=> ref_file.current.click()}/>
           <input type="file" ref={ref_file} onChange={onChangeFile} accept='image/*' style={{display:'none'}}/>
           <hr />
           <button className='update'>정보수정</button>
        </form>
    </div>
  )
}

export default MyPage