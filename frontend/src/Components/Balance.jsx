import React, { useEffect, useState } from 'react'
import user from '../store/user'
import { useRecoilValue } from 'recoil'
import axios from 'axios';
const Balance = () => {
  const userObject = useRecoilValue(user);

  return (
    <div className=' p-4 flex gap-2 font-bold text-md font-sans  rounded-md '>
        <h1>Hello {userObject.first_name}</h1>
       <h1>Your Balance</h1>
       <p>Rs {userObject.balance >=0 ? userObject.balance : 10000}</p>
    </div>
  )
}

export default Balance