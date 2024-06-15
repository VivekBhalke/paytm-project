import React from 'react'

const Button = ({text , clickHandler}) => {
  return (
    <button className=" shadow-lg p-5 bg-purple-400 rounded-md  hover:bg-purple-900 transition duration-1000" onClick={clickHandler}>{text}</button>
  )
}

export default Button