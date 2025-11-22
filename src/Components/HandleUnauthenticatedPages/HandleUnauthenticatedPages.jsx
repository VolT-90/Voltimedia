import React from 'react'
import { Navigate } from 'react-router-dom'



export default function HandleUnauthenticatedPages({ children }) {

  if(localStorage.getItem('tkn')){
     return <Navigate to={'/home'}/>
  }

  return (
    <>
      {children}
    </>
  )
}

