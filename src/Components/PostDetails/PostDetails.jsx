import React from 'react'
import PostCard from '../PostCard/PostCard'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoaderPage from '../LoaderPage/LoaderPage'

export default function PostDetails() {

  const {id} = useParams()

  console.log("id", id)

  function getPostDetails(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers : {
        token : localStorage.getItem('tkn')
      }
    }
    )
  }

    const {data , isLoading , isError, isFetching, error} = useQuery({
      queryKey : ['getSinglePost',id],
      queryFn : getPostDetails
    })

    if(isLoading){
     return <LoaderPage/>
    }

    if(isError){
      return <h1 className='text-4xl font-bold text-center'>{error.message}</h1>
    }

    console.log('isFetching',isFetching);
    
    console.log(isLoading)
    console.log(isError)
    console.log('error',error);
    

    

    // if(isError){
    //   <h1
    // }
    
  return (
    <>
        
        <div className=' flex justify-center my-6 w-full items-center'>
          <PostCard post = {data?.data?.post} isInSinglePost={true}/>
        </div>
        
    </>
  )
}

