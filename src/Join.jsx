import React, { useState } from 'react'
import {app} from '../firebase';
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'
import { getFirestore,doc,setDoc } from 'firebase/firestore';

const Join = ({history}) => {
    const db = getFirestore(app);
    const auth = getAuth(app);

    const [form,setForm] = useState({
        email:'user01@email.com',
        password:'12341234',
    })
    const {email, password} = form;
    
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const onSubmit = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            if(!window.confirm("회원가입 하시겠습니까?"))return;
            alert(email+"회원님 환영합니다!")
            setDoc(doc(db,'users',email),{
                email:email,
                name:'',
                address:'',
                phone:'',
                photo:''
            })
            history.push('/login');
        })
        .catch((error)=>{
            alert("회원가입 실패!" + error.message)
        })
    }
    return (
        <div>
            <h1>회원가입</h1>
            <form className='login' onSubmit={onSubmit}>
                <input type="text" placeholder='email' name='email' value={email} onChange={onChange}/>
                <input type="password" placeholder='password' name='password' value={password} onChange={onChange}/>
                <button className='logBtn'>가입하기</button>

            </form>
        </div>
      )
}

export default Join