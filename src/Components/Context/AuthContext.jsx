import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const authcontext = createContext()


export default function AuthContext({ children }) {

  // <----Lazy intialzation to handle the user Refresh---->
    const [token, settoken] = useState(function (){
      return localStorage.getItem('tkn')
    })

    // <---------------To be more readable---------------->
    function insertAuthToken(authToken){
        settoken(authToken)
        console.log('Token :',authToken)
    }


    //<----------------Clear user Token------------------->
    function clearUserToken(){
      settoken(null);
    }

    //<----------------Handle user refresh---------------->
    // useEffect(function(){
    //   if(localStorage.getItem('tkn')){
    //     const localStorageToken = localStorage.getItem('tkn')
    //     settoken(localStorageToken)
    //   }
    // },[])

  return (
    <authcontext.Provider value={
        {
            insertAuthToken,
            token,
            clearUserToken
        }
    }>
      {children}
    </authcontext.Provider>
  )
}
