import React from "react";

export default function PostHeader({user,postDate}) {
  const staticImage = 'https://tse1.mm.bing.net/th/id/OIP.ZU0MFXg5szouHXzwKg410AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
  return (
    <>
      <div className="post-header flex justify-between mb-2 ">
        <div className="left-part flex gap-2 items-center">
          <img onError={(e) => {
              e.target.src = staticImage;
            }} src={user.photo} alt="" className="rounded-full w-10 h-10 flex " />
          <div>
            <h2 className="font-bold">{user.name}</h2>
            <p>{postDate}</p>
          </div>
        </div>

        <div className="right-part ">
          <i class="fa-solid fa-ellipsis cursor-pointer"></i>
        </div>
      </div>
    </>
  );
}
