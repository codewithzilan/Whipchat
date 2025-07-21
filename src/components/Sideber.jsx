import React, { useEffect, useState } from 'react'
import ProfileImage from '../assets/profile.png'
import { AiOutlineHome } from "react-icons/ai";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdOutlineEditNotifications } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { GiEntryDoor } from "react-icons/gi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';



const Sideber = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let location=useLocation()
  let [activevalue,setActiveValue]=useState()

  let handleLogout = () => {
    signOut(auth).then(() => {
      toast.loading('Please Wait a Moment')
      setTimeout(()=>{
        navigate('/login')
      },5000)
    })
  }

  useEffect(()=>{
    setActiveValue(location.pathname.replace('/pages/',''))
  })

  return (
    <div className='sideber-layout'>
      <div className='profile-layout'>
        <img src={ProfileImage} alt="" />
      </div>
      <div className='chatting-layout'>
        <Link to='/pages/home' className={activevalue=="home" && "active-icons"}><AiOutlineHome className='common-icons' /></Link>
        <Link to='/pages/message' className={activevalue=="message" && "active-icons"}><LuMessageSquareMore className='common-icons' /></Link>
        <Link to='/pages/notification' className={activevalue=="notification" && "active-icons"}> <MdOutlineEditNotifications className='common-icons' /></Link>
        <Link to='/pages/settings' className={activevalue=="settings" && "active-icons"}> <TbSettings className='common-icons' /></Link>
      </div>

      <div className='logout-layout'>
        <GiEntryDoor onClick={handleLogout} className='common-icons logout-icon' />
      </div>

      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
  )
}

export default Sideber