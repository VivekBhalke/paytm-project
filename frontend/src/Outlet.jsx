import React from 'react'
import { BrowserRouter , Route , Routes} from "react-router-dom";
import Home from './Pages/Home';
import SendMondy from './Pages/SendMondy';
import Profile from './Pages/Profile';
const Outlet = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/sendMoney/:user_id" element={<SendMondy/>}  />
        <Route path="/profile" element={<Profile/>}  />
      </Routes>
    </BrowserRouter>
  )
}

export default Outlet