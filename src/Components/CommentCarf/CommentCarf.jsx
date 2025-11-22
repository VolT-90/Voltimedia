import React from "react";
import PostHeader from "../PostHeader/PostHeader";

export default function CommentCard({ commentDetails}) {
  return (
    <>
      <div className="bg-gray-50 mt-2 p-2 md:p-4  rounded-4xl">
        {/* <div className="flex flex-wrap gap-2 items-center pb-3">
          <img
            className="w-10 rounded-full"
            onError={(e) => {
              e.target.src = staticImage;
            }}
            src={commentDetails.commentCreator.photo}
            alt=""
          />

          <div>
            <h5 className="font-bold">{commentDetails.commentCreator.name}</h5>
            <p>{commentDetails.createdAt}</p>
          </div>
        </div> */}

        <PostHeader user = {commentDetails.commentCreator} postDate={commentDetails.createdAt}/>

        <div>
          <p>{commentDetails.content}</p>
        </div>

        
      </div>


    </>
  );
}
