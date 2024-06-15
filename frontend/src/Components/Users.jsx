import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Link } from "react-router-dom";
const Users = () => {
  const [filter , setFilter] = useState(null);
  const [users , setUsers] = useState([]);
  useEffect(()=>{
    async function getUsers(){
        console.log("get User ran");
        const url = "http://localhost:3000/api/v1/user/bulk?filter=" + filter;
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
          users.map((user , index)=>( <User user={user }/>))  
       }
    </div>
  )
}

function User({user}){
    const to = "/sendMoney/" + user.user_id;
    return (
        <div className='flex w-full  justify-between'>
            <div className=' flex gap-4 items-center'>
                <p className=' rounded-[30%] shadow-md p-3 text-center hover:bg-purple-400 transition duration-1000'>{user.first_name[0]}</p>
                <p className=' text-md text-black hover:text-purple-500 transition duration-1000 '>{user.first_name}</p>
                <p className=' text-md text-black hover:text-purple-500 transition duration-1000 ml-1'>{user.last_name}</p>

            </div>
            <Link to={to} state={{user}}><button className='hover:bg-purple-400 transition duration-1000 bg-black rounded-md shadow-lg p-2 text-white text-xl font-bold'>Send Money</button></Link>
        </div>
    )
}

export default Users