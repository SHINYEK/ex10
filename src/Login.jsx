import React, { useState } from 'react'
import {app} from '../firebase'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { NavLink } from 'react-router-dom';

const Login = ({history}) => {
const auth = getAuth(app);
const [form,setForm] = useState({
    email:'user01@email.com',
    password:'12341234'
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
    signInWithEmailAndPassword(auth,email,password)
    .then((success)=>{
        alert(email+"회원님 환영합니다!")
        history.push('/');
        sessionStorage.setItem('email',email);
    })
    .catch((error)=>{
        alert("로그인 실패!" + error.message)
    })
}

  return (
    <div>
        <h1>Login🔒</h1>
        <form className='login' onSubmit={onSubmit}>
            <input type="text" placeholder='email' name='email' value={email} onChange={onChange}/>
            <input type="password" placeholder='password' name='password' value={password} onChange={onChange}/>
            <button className='logBtn'>로그인</button>
            <NavLink to='/join'><button className='logBtn'>회원가입</button></NavLink>
        </form>
    </div>
  )
}

export default Login