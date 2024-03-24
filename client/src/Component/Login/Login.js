import React, { useEffect, useState } from 'react'
import './Login.css'
import {  Avatar } from '@mui/material'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getActiveDates } from '../../Actions/allCategory';
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {LoadUserNoLoad} from '../../Actions/User'


const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const error = useSelector(state => state.user.error);
    const {isAuthenticated} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const alert = useAlert();
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

    useEffect(() => {
      if(isAuthenticated){
        navigate("/")
      }
    }, [navigate,isAuthenticated])
   
        
  const loginHandler = async (e) => {
      e.preventDefault();
      try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axiosInstance.post("/login",{email,password},{

            headers:{
                "Content-Type":"application/json"
            }
        })
        localStorage.setItem("token",data.token);
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        navigate("/");
       dispatch(LoadUserNoLoad());
       dispatch(getActiveDates())

    } catch (err) {
        dispatch({
            type:"LoginFailure",
            payload:err.response.data.message
        })
        
    }

    //   dispatch(LoginUser(email,password,));
    //  dispatch(getActiveDates)
  }

  useEffect(() => {
  if(error) {
    alert.error(error);
    dispatch({
      type:"ClearError"
    })
  }  
     
  }, [dispatch,alert,error])
  

  return (
    <div className='login'>
        
        <form className='loginForm' >
        < Avatar
          src='../images/ArjunaI_Simbol.png'
         sx={{ height: '100px', width: '100px'}}  />
        <input type="email" placeholder='Email' 
         value={email}
         onChange ={(e) => setEmail(e.target.value) }
        required/>
        
        <input type="password" placeholder='Password' 
         value={password}
         onChange ={(e) => setPassword(e.target.value) }
        required/>
       <Link to='/' onClick={loginHandler}> <button >Login </button></Link>
        </form>
     </div>
  )
}

export default Login