import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Link } from "react-router-dom";
import user from '../store/user';
import { useRecoilValue  , useSetRecoilState} from 'recoil';
const Users = () => {
  const [filter , setFilter] = useState(null);
  const [users , setUsers] = useState([]);
  const setuser = useSetRecoilState(user);
  const userObject = useRecoilValue(user);
  useEffect(()=>{
    async function getUsers(){
        console.log("get User ran");
        const url = "https://paytm-project-6qha.onrender.com/api/v1/user/bulk?filter=" + filter;
        const response = await axios.get(url , {
            headers : {
                'Content-type' : "application/json",
                'token':localStorage.getItem("token")
            }
        })
        if(!response.data)
            {
                console.log("no response")
            }
        console.log(response.data.users);
        if(response.data.users)
        {
            setUsers(response.data.users);
        }
        else{
            console.log("no users found")
            setUsers([]);
        }
    }
    getUsers();
  } , [filter])
  return (
    <div className='px-4 flex flex-col gap-2 '>
       <h1 className='text-xl font-sans font-bold'>Users</h1>
       <input type="text" className=' w-full rounded-md px-3 h-9 text-xl shadow-md' onChange={(e)=> setFilter(e.target.value)} placeholder='Search..'/>
       {
          users.map((user , index)=>( 
            user.user_id != userObject.user_id ?  <User Touser={user }/> : <></>
        ))  
       }
    </div>
  )
}

function User({Touser}){
    const to = "/sendMoney/" + Touser.user_id;
    return (
        <div className='flex w-full  justify-between'>
            <div className=' flex sm:gap-4  sm:justify-start items-center'>
                <p className=' rounded-[30%] shadow-md p-3 text-center hover:bg-purple-400 transition duration-1000'>{Touser.first_name[0]}</p>
                <p className=' text-md text-black hover:text-purple-500 transition duration-1000 '>{Touser.first_name + " " +  Touser.last_name}</p>

            </div>
            <Link to={to} state={{Touser}}><button className='hover:bg-purple-400 transition duration-1000 bg-black rounded-md shadow-lg p-2 text-white text-md sm:text-xl font-bold'>Send Money</button></Link>
        </div>
    )
}

export default Users