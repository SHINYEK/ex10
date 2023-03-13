import React from 'react'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Home'
import Join from './Join'
import Login from './Login'
import MyPage from './MyPage'
import Product from './Product'
import Users from './Users'

const Menu = ({history}) => {

  const onLogout = () =>{
    if(!window.confirm("로그아웃 하시겠습니까?"))return;
    sessionStorage.removeItem('email');
    history.push('/')
  }
  return (
    <div>
       <div className='menu'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/user'>회원목록</NavLink>
            {sessionStorage.getItem('email')?<NavLink to='#' onClick={onLogout}>로그아웃</NavLink>:<NavLink to='/login'>로그인</NavLink>}
            {sessionStorage.getItem('email')&&<span className='email'>🌸{sessionStorage.getItem('email')} 님</span>}
            {sessionStorage.getItem('email')&&<NavLink to='/mypage'><span className='email'>마이페이지</span></NavLink>}
       </div>

       <Switch>
            <Route path='/' component={Home} exact={true}></Route>
            <Route path='/user' component={Users}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/join' component={Join}></Route>
            <Route path='/mypage' component={MyPage}></Route>
            <Route render={({location})=><h1>{location.pathname}페이지는 존재하지 않습니다</h1>}/>
       </Switch>
    </div>
  )
}

export default withRouter(Menu)