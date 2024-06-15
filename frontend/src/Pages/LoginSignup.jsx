import { useState } from "react"
import axios from "axios";
import user from "../store/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../Components/Button";
const LoginSignup = () => {

  const [email , setEmail] = useState('');
  const [password , setPassword ] = useState('');
  const [first_name , setFirstName] = useState('');
  const [last_name , setLastName] = useState('');
  const setUser= useSetRecoilState(user);
  const userObject = useRecoilValue(user); 
  const handleLogin = async (event)=>{
    event.preventDefault();
    const response = await axios.post("http://localhost:3000/api/v1/user/login",{
        email,password
    },{
        headers:{
            'Content-type' : "Application/json"
        }
    })
    if(response.data.token)
    {
        console.log("verified");
        console.log(response.data.token);
        localStorage.setItem("token",response.data.token);
        setUser(response.data.user);
    }
    else{
        alert("wrong credentials enter correct ones ");
    }
  }
  const handleSignup = async (event)=>{
    event.preventDefault();
    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
        email,password,first_name,last_name
    },{
        headers:{
            'Content-type' : "Application/json"
        }
    })
    if(response.data.token)
    {
        console.log("verified")
        localStorage.setItem("token",response.data.token);
        setUser(response.data.user);
        
    }
    else{
        alert("wrong credentials enter correct ones ");
    }
  }
  return (
    <div className="border-red-400 border-4 w-screen h-[100vh] flex flex-col justify-center items-center">
        <div className=" bg-slate-400 rounded-md h-[75%] w-[80%] sm:w-[30%] md:w-[50%] border-red-400 border-4 flex flex-col gap-4 p-5 items-start">
            <p className=" text-center w-full p-2 text-gray text-3xl">Login OR Singup</p>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className=" w-[100%] px-5 rounded-md text-xl h-[10%]" />
            <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className=" w-[100%] px-5 rounded-md text-xl h-[10%]" />
            <input type="text" placeholder="FirstName" onChange={(e)=>setFirstName(e.target.value)} className=" w-[100%] px-5 rounded-md text-xl h-[10%]" />
            <input type="text" placeholder="SecondName" onChange={(e)=>setLastName(e.target.value)} className=" w-[100%] px-5 rounded-md text-xl h-[10%]" />

            <p className="text-center w-full p-2 text-gray text-md">New here Click on Signup by filling Details</p>
            <div className=" flex gap-4 justify-center w-full">
                <Button text={"Login" } clickHandler={handleLogin}></Button>
                <Button text={"Signup" } clickHandler={handleSignup}></Button>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup