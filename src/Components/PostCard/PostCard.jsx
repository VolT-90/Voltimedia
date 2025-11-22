import React, { useEffect, useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import CommentCard from "../CommentCarf/CommentCarf";
import { Link } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostCard({ post, isInSinglePost }) {
  //Derived State
  const [comments, setcomments] = useState(null);
  const [commentFieldValue, setcommentFieldValue] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  //Enahcements
  const user = post.user;
  const image = post.image;
  const postCaption = post.body;
  const postDate = post.createdAt;
  const firstComment = post.comments?.[0];
  const allCommentReversed = structuredClone(post).comments?.reverse()
  console.log(firstComment);
  console.log(firstComment?.commentCreator.photo);


  // addComment Function
  function handleAddComment() {

      const commentBody = {
      content : commentFieldValue,
      post : post.id
    }

    return axios.post("https://linked-posts.routemisr.com/comments", commentBody, {
      headers: {
        token: localStorage.getItem("tkn"),
      },
    });
  }


  //UseQueryClient
  const useQuery = useQueryClient([`getSinglePost`,post.id])
  

  const {mutate,isPending} = useMutation({
    mutationFn : handleAddComment,
    
    onSuccess : function(resp){
      console.log(resp);
      //DISPLAY SUCCESS MESSAGE TO THE USER
      useQuery.invalidateQueries()
    },

    onError : function(error){
      console.log(error);
      //DISPLAY ERROR MESSAGE TO THE USER
    }
  });


  // function handleAddComment(){

  //   setisLoading(true)

  //   const commentBody = {
  //     content : commentFieldValue,
  //     post : post.id
  //   }

  //   axios.post('https://linked-posts.routemisr.com/comments',
  //     commentBody,{
  //     headers : {
  //       token : localStorage.getItem('tkn')
  //     }
  //   }
  //   )
  //   .then(
  //     function(x){
  //       console.log('data',x.data)

  //       //SUCCESS
  //       setcommentFieldValue("")

  //       //re-fetch post details is a must

  //     }
  //   )
  //   .catch(
  //     function(x){
  //       console.log('error',x)
  //     }
  //   )
  //   .finally(
  //     () => setisLoading(false)
  //   )

  // }

  useEffect(
    function () {
      setcomments(post?.comments);
    },
    [post]
  );

  return (
    <>
      <div className="bg-gray-200 p-5 rounded-lg md:col-span-6">
        {/* Header */}
        <PostHeader user={user} postDate={postDate} />

        {/* Body */}
        <div className="post-body">
          <p className="pl-2">{postCaption}</p>

          {/* Conditional rendering image */}
          {image && <img src={image} className="w-full py-2"></img>}
        </div>

        {/* Footer */}
        <div className="post-footer flex w-full divide-x divide-gray-800 text-gray-800 text-sm sm:text-base">
          {/* Like */}
          <div className="flex-1 flex justify-center items-center gap-1 py-2 cursor-pointer hover:bg-gray-100 rounded-l-lg">
            <i className="fa-solid fa-thumbs-up"></i>
            <p className="font-bold">Like</p>
          </div>

          {/* Comment */}
          <div className="flex-1 flex justify-center items-center gap-1 py-2 cursor-pointer hover:bg-gray-100">
            <i className="fa-solid fa-comment"></i>
            <p className="font-bold">Comment</p>
          </div>

          {/* Share */}
          <div className="flex-1 flex justify-center items-center gap-1 py-2 cursor-pointer hover:bg-gray-100 rounded-r-lg">
            <i className="fa-solid fa-share"></i>
            <p className="font-bold">Share</p>
          </div>
        </div>

        {/* Add Comment */}
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative my-3">
          <input
            type="search"
            value={commentFieldValue}
            onChange={(e) => setcommentFieldValue(e.target.value)}
            id="default-search"
            className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Add your comment..."
            required
          />
          <button
            onClick={mutate}
            disabled={isPending}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 "
          >
            {isPending ? <BounceLoader size={25} color="white" /> : "comment"}
          </button>
        </div>

        {/* First Comment */}
        {!isInSinglePost && firstComment && (
          <CommentCard commentDetails={firstComment} />
        )}

        {/* Show view more comments */}
        {!isInSinglePost && (
          <Link
            to={`/postDetails/${post.id}`}
            className="text-blue-600 w-full text-center cursor-pointer p-5 "
          >
            View more comments...
          </Link>
        )}

        {/* Show all comments in the postDetails page  */}
        {isInSinglePost &&
          allCommentReversed.map((comment) => (
            <CommentCard commentDetails={comment} />
          ))}
      </div>
    </>
  );
}
