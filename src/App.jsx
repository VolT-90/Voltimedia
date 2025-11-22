import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import AuthContext from './Components/Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import HandleUnauthenticatedPages from './Components/HandleUnauthenticatedPages/HandleUnauthenticatedPages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './Components/PostDetails/PostDetails'


function App() {

 const routes =  createBrowserRouter([
    {path: '/',element: <Layout/>, children : [
      {index : true , element:
        <HandleUnauthenticatedPages>
          <Login/>
        </HandleUnauthenticatedPages>  },
      {path : '/register' , element: 
        <HandleUnauthenticatedPages>
          <Register/>
        </HandleUnauthenticatedPages> },
      {path : '/profile' , element:
        <ProtectedRoute>
         <Profile /> 
         </ProtectedRoute>},
      {path : '/home' , element: 
        <ProtectedRoute>
         <Home /> 
         </ProtectedRoute> },
      {path: '/postDetails/:id', element:
        <PostDetails/>
      },
      {path : '*' , element:
      <><h1 className='text-center font-bold'>NOT FOUND 404</h1></>}
    ]}
  ])

  const client = new QueryClient()

  return (
    <AuthContext>
       <QueryClientProvider client={client}>
        <RouterProvider router={routes}/>
       </QueryClientProvider>
    </AuthContext>
  )
}

export default App
