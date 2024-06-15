import React from 'react'
import Appbar from '../Components/Appbar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
const Home = () => {
  return (
   <div className=''>
    <Appbar></Appbar>
    <div className= 'pt-[50px] px-10 '>
      <div className=' gap-4 flex flex-col'>
        <Balance></Balance>
        <Users></Users>
      </div>
    </div>
   </div>
  )
}

export default Home