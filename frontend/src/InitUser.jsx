import React, { useEffect } from 'react'
import user from './store/user'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginSignup from './Pages/LoginSignup';
import axios from "axios"
import Outlet from './Outlet';
const InitUser = () => {
  const setuser = useSetRecoilState(user);
  const userObject = useRecoilValue(user);
  console.log("this is the userObject : " , userObject);
  useEffect(()=>{

    async function verifyUser(){
        console.log("init user ran");
        console.log("this is the token : " , localStorage.getItem("token"));
        const response = await axios.get("https://paytm-project-6qha.onrender.com/api/v1/me/myId" , {
            headers: {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem("token")
            }
        })
        console.log(response)
        if(response.data.user){
            setuser(response.data.user);
        }
        else{
            console.log("null")
            setuser(null);
            console.log("done")
        }
    }
    verifyUser();
  } , [])
  if(!userObject || !userObject.user_id)
  {
    return(
        <LoginSignup/>
    )
  }
  return (
    <Outlet></Outlet>
  )
}

export default InitUser