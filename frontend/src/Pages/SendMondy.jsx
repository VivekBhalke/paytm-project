import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import user from '../store/user';

const SendMondy = () => {
    const userObject = useRecoilValue(user);
    const setUserObject = useSetRecoilState(user);
    const location = useLocation();
    const { Touser } = location.state || {};
    console.log("this is the user:" , user);
    const [amount , setAmount] = useState(0);
    const handleTransfer = (e) =>{
        e.preventDefault();
        async function transfer(){
            const response = await axios.post("https://paytm-project-6qha.onrender.com/api/v1/account/transfer" ,{
                to: Touser.user_id,
                amount
            },{
                headers : {
                    "Content-type" : "Application/json",
                    "token" : localStorage.getItem("token")
                }
            });
            if(response.data.message == "Transaction done successfully")
            {
                alert("transfer done successfully");
                const object = {
                    user_id : userObject.user_id,
                    first_name : userObject.first_name,
                    last_name : userObject.last_name,
                    email : userObject.email,
                    balance : userObject.balance - amount
                }
                setUserObject(object);
            }
            else{
                alert("there was some error");
            }
        }
        transfer();
    }
  return (
    <div className=' flex flex-col w-screen h-screen justify-center items-center '>
        <div className=' bg-slate-100 shadow-xl md:w-[50%] sm:w-[80%] lg:w-[30%] h-fit hover:shadow-2xl transition duration-1000 rounded-2xl p-7 flex flex-col gap-5'>
            <p className=' w-full text-center sm:text-xl md:text-2xl lg:text-3xl text-black font-bold hover:text-purple-500 transition duration-1000'>Send Money</p>
            <div className=' flex gap-2 items-center'>
                <p className=' rounded-[30%] shadow-md p-3 text-center hover:bg-purple-400 transition duration-1000'>{Touser.first_name[0]}</p>
                <h1 className=' sm:text-md text-xl text-black font-semibold hover:text-purple-500 transition duration-1000'>{Touser.first_name + " " + Touser.last_name}</h1>
            </div>
            <input type='number' className=' w-[70%] h-10 text-xl rounded-md ' placeholder='Amount in Rs'  onChange={(e)=>setAmount(e.target.value)}/>
            <button className=' bg-green-500 rounded-md shadow-lg text-center w-full p-2 hover:text-red-500 transition duration-1000' onClick={handleTransfer}>Initiate Transfer</button>
        </div>
    </div> 
    
  )
}

export default SendMondy