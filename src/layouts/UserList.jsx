import React from 'react'
import { RiSearch2Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";


const UserList = () => {
  return (
    <div className='userlist'>
        <div className='userlist-input-box'>
                <RiSearch2Line className='search-icon' />
            <input type="text" placeholder='Search' />
                <BsThreeDotsVertical className='three-dot-icon' />
        </div>
        <div></div>
    </div>
  )
}

export default UserList