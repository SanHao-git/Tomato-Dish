import React, { useContext, useState } from 'react';
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
  
    const {url, setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
    });

    const onChangHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data, [name]: value}));
    };

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }
      console.log(newUrl);
      
      const response = await axios.post(newUrl, data);
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    }
  
    return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-input">
            {currState==='Login'?<></>:<input name="name" onChange={onChangHandler} value={data.name} type="text" placeholder='Enter your name' required/>}
            <input name="email" onChange={onChangHandler} value={data.email} type="email" placeholder='Enter your email' required/>
            <input name="password" onChange={onChangHandler} value={data.password} type="password" placeholder='New password' required/>
        </div>

        {currState==='Sign up'
        ?<div className="login-popup-condition">
            <input type="checkbox" required />
            <p>To continue, you must agree to the terms and conditions of use.</p>
        </div> : <></>}

        <button type='submit'>{currState==='Sign up'?'Create account':'Login'}</button>
        
        {currState==='Login'
        ?<p>Don't have an account? <span onClick={()=>setCurrState('Sign up')}>Click here to register</span></p>
        :<p>Have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
      </form>
    </div>
  );
}

export default LoginPopup;
