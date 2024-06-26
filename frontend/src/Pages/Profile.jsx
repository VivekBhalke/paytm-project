import React from 'react'
import user from '../store/user'
import { useRecoilValue, useSetRecoilState  } from 'recoil'
const Profile = () => {
    const userObject = useRecoilValue(user);
    const setUserObject = useSetRecoilState(user);
    const clickHandler = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setUserObject({
            first_name : null,
            last_name : null,
            email : null,
            user_id : null,
            balance : null
          });
          window.location.href = "/"
    }
    return (
        <div className=' flex flex-col w-screen h-screen justify-center items-center '>
            <div className=' bg-slate-100 shadow-xl md:w-[50%] sm:w-[80%] lg:w-[30%] h-fit hover:shadow-2xl transition duration-1000 rounded-2xl p-7 flex flex-col gap-5'>
                <p className=' w-full text-center sm:text-xl md:text-2xl lg:text-3xl text-black font-bold hover:text-purple-500 transition duration-1000'>Profile</p>
                <div className=' flex gap-2 items-center'>
                    <p className=' rounded-[30%] shadow-md p-3 text-center hover:bg-purple-400 transition duration-1000'>{userObject.first_name[0]}</p>
                    <h1 className=' sm:text-md text-xl text-black font-semibold hover:text-purple-500 transition duration-1000'>{userObject.first_name + " " + userObject.last_name}</h1>
                </div>
                <div className=' flex gap-4'>
                    <p className=' rounded-md shadow-md p-3 text-center w-fit hover:bg-purple-400 transition duration-1000' >Balance : {userObject.balance}</p>
                    <button className=" shadow-lg p-5 bg-purple-400 rounded-md  hover:bg-purple-900 transition duration-1000" onClick={clickHandler}>Logout</button>
                    
                </div>
            </div>
        </div> 
        
      )
}

export default Profile