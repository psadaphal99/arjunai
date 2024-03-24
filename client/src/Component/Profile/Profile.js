import React from 'react'
import './Profile.css'
import {useDispatch, useSelector} from 'react-redux'
import { LogoutUser } from '../../Actions/User'


const Profile = ({setProfileactive}) => {
const dispatch = useDispatch()
const { user }  = useSelector(state => state.user)

  const LogoutHandler = () => {
    dispatch(LogoutUser());
    localStorage.removeItem('token');
  }
  

  return (
   <div className="profile-details">
     <span className="material-icons closeicon" onClick={() => setProfileactive(false)}>close</span>
      <div className='userprofile'>
      <div className="userphoto">{user.name[0]}</div>
      <div className="username">{user.name}</div>
      <div className="useremail">{user.email}</div>

     <hr/>

    <button className='updatepass-btn'> Update Password </button>
   
    <button className='logout-btn' onClick={LogoutHandler}> Logout </button>
    </div>
   </div>
  )   
}

export default Profile;