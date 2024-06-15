import React from 'react'
import { Link } from 'react-router-dom'
const Appbar = () => {
  return (
    <div className='fixed w-full h-fit p-2 rounded-md shadow-lg hover:shadow-2xl transition duration-1000 flex justify-evenly '>
        <h1 className=' text-xl font-semibold text-gray-500 '>
            Paytm App
        </h1>
        <div className=' flex gap-4 '>
            <h1 className=' text-xl text-gray-500 '>
                Hello
            </h1>
            <Link to={'/profile'} ><button className=' rounded-[50%] shadow-md px-3 py-1'>U</button></Link>
        </div>
    </div>
  )
}

export default Appbar