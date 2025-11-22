import React, { useState } from 'react' 
import { useForm } from 'react-hook-form'
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
// {
//     "name": "Ahmed Bahnasy",
//     "email":"bahnasy2040@gmail.com",
//     "password":"Bahnasy@123",
//     "rePassword":"Bahnasy@123",
//     "dateOfBirth":"7-10-1994",
//     "gender":"male"
// }




export default function Register() {

//   //States
//   const [username, setusername] = useState('Habzlam')

  // <-----------Alerts States ------------------->
  const [isSuccessed, setisSuccessed] = useState(false)
  const [isFailed, setisFailed] = useState(null)
  const navigate = useNavigate()


//   //When Submit
//   function handlSubmit(e){
//   console.log('Submit');

//   e.preventDefault()
// }

//   //Control input values
//   function handleChage(e){
//   console.log(e.target.value);
  
//   setusername(e.target.value)
// }

// <----------------Zod--------------------> 
const schema = zod.object({
    name: zod.string().nonempty('Username is required').min(3,'ZOD: Username must be 3 chars at least').max(13,'ZOD: Username must be at most 13 chars'),
     email: zod.string().nonempty('Email is required').email('Invalid email address'),
     password: zod.string().nonempty('Password is required').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Presence of specific character types: At least one uppercase letter, one lowercase letter, one digit, and one special character.'),
     rePassword: zod.string().nonempty('rePassword is required'),
      dateOfBirth: zod.coerce.date('Invalid date')
    .refine((value) => {
      const currentYear = new Date().getFullYear();
      const birthYear = value.getFullYear();
      return currentYear - birthYear >= 18;
    }, 'Your age must be 18 or above')
    .transform((value) => {
      return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
    }),

  gender: zod.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender is invalid' })
  })
})
.refine(
  (data) => data.password === data.rePassword, // validation condition
  {
    message: "Passwords are not compatible",   // error message
    path: ["rePassword"]                       // where to attach the error
  }
)
// <---------------useForm------------------->
const {handleSubmit , register , formState , setError } =  useForm({
  
    defaultValues : {
     name: "",
     email:"",
     password:"",
     rePassword:"",
     dateOfBirth:"",
     gender:""
  },

  mode : 'onBlur',
    
  resolver : zodResolver(schema)
}
)

// <-------------Handle the Submit Button------------->
async function myHandleSubmit(data){
  console.log("Register...",data);
  // <-------------RHF handle password --------------->
  // if(data.password === data.rePassword){
  //   return true
  // }
  // else{
  //   setError('rePassword',{message : "Your password does'nt match"})
  // }

  //<--------------Send to BackEnd---------------->
  await axios.post(`https://linked-posts.routemisr.com/users/signup`, data)
  .then(function(x){
    console.log(x.data.message); 
    setisSuccessed(true)

    setTimeout(
      function(){
        navigate('/')
      }
    ,2000)
  })
  .catch(function(x){
    console.log(x.response.data.error);
    setisFailed(x.response.data.error)

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
        <h1 className = 'font-bold text-4xl text-center text-blue-700 p-4 animate-bounce'>Register</h1>

       {isSuccessed && <div className='bg-green-500 text-white text-center my-5'>Congratulaions..........</div>}
       {isFailed && <div className='bg-red-500 text-white text-center my-5'>{isFailed}</div>}

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(myHandleSubmit)}>

        {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-700">Username</label>
            <input {...register('name'
            // ,{
            //   required: {
            //     value : true,
            //     message : 'Username is required'
            //   },
            //   minLength: {
            //     value : 3,
            //     message : 'Username must be at least 3 characters'
            //   },
            //   maxLength: {
            //     value : 13,
            //     message : 'Username must be at most 13 characters'
            //   },
            // }
            )
    
            } type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
            {formState.errors.name && <p className='text-red-500'>{formState.errors.name?.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-700">Email</label>
            <input {...register('email'
            // ,{
            //   required : {
            //     value : true,
            //     message : 'Email is required'
            //   },
            //   validate : function(value){
            //     const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            //     if(!value.includes('@')){
            //       return 'Email must include @'
            //     }
            //     else if(!regex.test(value)){
            //       return 'Email format is invalid'
            //     }
            //     else{
            //       return true
            //     }
            //   }
            // }
            )} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Volt@hotmail.com"  />
              {formState.errors.email && <p className='text-red-500'>{formState.errors.email?.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-700">Password</label>
            <input {...register('password'
            // ,
            // {
            //     required: {
            //     value : true,
            //     message : 'Password is required'
            //   },
            //   pattern : {
            //     value : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            //     message : 'Presence of specific character types: At least one uppercase letter, one lowercase letter, one digit, and one special character.'
            //   }
            // }
            )} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=''/>
            {formState.errors.password && <p className='text-red-500'>{formState.errors.password?.message}</p>}
          </div>
          
          {/* Repassword */}
          <div className="mb-5">
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-blue-700">Confirm Password</label>
            <input {...register('rePassword')}  type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=''/>
            {formState.errors.rePassword && formState.touchedFields.rePassword && <p className='text-red-500'>{formState.errors.rePassword?.message}</p>}
          </div>

          {/* Date of Birth */}
          <div className="mb-5">
            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-blue-700">Birthdate</label>
            <input {...register('dateOfBirth'
            // ,{
            //         required : {
            //           value : true,
            //           message : 'Age is required'
            //         },
            //         valueAsDate : true,

            //         validate : function(value){
            //           const currentYear = new Date().getFullYear()

            //           if(currentYear - value.getFullYear() >= 18){
            //             return true
            //           }
            //           else{
            //             return 'Age must be 18 or above'
            //           }
            //         }
            //     }
            )} type="date" id="dateOfBirth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  />
            {formState.errors.dateOfBirth && <p className='text-red-500'>{formState.errors.dateOfBirth?.message}</p>}
          </div>
          
          {/* Gender */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-blue-700">Gender</label>

            <div className='d-flex'>
              <label htmlFor="gender" className='px-2.5'>Male</label>
              <input {...register('gender'
            //   ,
            //   {
            //     required : {
            //       value :true,
            //       message : 'Please confirm your gender'
            //     },
                

            // }
              )} type="radio" name="gender" id="Male" value = 'male'/>

              <label htmlFor="gender" className='px-2.5'>Female</label>
              <input {...register('gender')} type="radio" name="gender" id="Female" value = 'female' />
            </div>

          </div>
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer transform transition-colors duration-200">
              {formState.isSubmitting?  <BounceLoader color="white"size={25}/> : "Register"}
          </button>
        </form>
    </div>
  )
}
