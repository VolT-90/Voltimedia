import React, { useState } from 'react' 
import { useForm } from 'react-hook-form'
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { useContext } from 'react';
import { authcontext } from '../Context/AuthContext';

export default function Login() {

  // <-----------Alerts States ------------------->
  const [isSuccessed, setisSuccessed] = useState(false)
  const [isFailed, setisFailed] = useState(null)
  const navigate = useNavigate()

// <----------------Zod--------------------> 
const schema = zod.object(
  {
     email: zod.string().nonempty('Email is required').email('Invalid email address'),
     password: zod.string().nonempty('Password is required')
})

// <---------------useForm------------------->
const {handleSubmit , register , formState , setError } =  useForm({
  
    defaultValues : {
     email:"",
     password:""
  },

  mode : 'onSubmit',
    
  resolver : zodResolver(schema)
}
)

// <------------------Recive the Context--------------------------->

const {insertAuthToken} = useContext(authcontext)

// <-------------Handle the Submit Button------------->
async function myHandleSubmit(data){

  //<--------------Send to BackEnd---------------->
  await axios.post(`https://linked-posts.routemisr.com/users/signin`, data)
  .then(function(x){
    console.log(x.data.message); 
    setisSuccessed(true)

    const token = x.data.token;

    insertAuthToken(token)
    localStorage.setItem('tkn',token)

    setTimeout(
      function(){
        navigate('/home')
      }
    ,2000)
  })
  .catch(function(x){
    console.log(x.response.data.error);
    setisFailed('incorrect email or password')

    setTimeout(
      function(){
        setisFailed(null)
      }
    ,2000)
  })


}

console.log(formState.errors);


  //<---------------RHF is commented------------------>
  return (
    <div>
        <h1 className = 'font-bold text-4xl text-center text-blue-700 p-4 animate-bounce'>Login</h1>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(myHandleSubmit)}>

        
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-700">Email</label>
            <input {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Volt@hotmail.com"  />
              {formState.errors.email && <p className='text-red-500'>{formState.errors.email?.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-700">Password</label>
            <input {...register('password' )} type="password" id="password" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=''/>
            {formState.errors.password && <p className='text-red-500'>{formState.errors.password?.message}</p>}
          </div>
        
              {isSuccessed && <div className='bg-green-500 text-white text-center my-5 rounded'>Welcome Back..........</div>}
              {isFailed && <div className='bg-red-500 text-white text-center my-5 rounded'>{isFailed}</div>}   

          <button type="submit" className=" text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center cursor-pointer transform transition-colors duration-200">
              {formState.isSubmitting?  <BounceLoader color="white"size={25}/> : "Login"}
          </button>
        </form>

    </div>
  )
}
