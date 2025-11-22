import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const [allPosts, setallPosts] = useState(null);
  // const [isLoading, setisLoading] = useState(false);

  // function getAllPosts() {
  //   axios
  //     .get("https://linked-posts.routemisr.com/posts?limit=20", {
  //       headers: {
  //         token: localStorage.getItem("tkn"),
  //       },
  //     })
  //     .then(function (x) {
  //       console.log("Response", x.data);
  //       setallPosts(x.data.posts);
  //     })
  //     .catch(function (x) {
  //       console.log("Error", x);
  //     })
  //     .finally(function(x){
  //       setisLoading(true)
  //     });
  // }

  // useEffect(function () {
  //   getAllPosts();
  // }, []);

  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=20", {
      headers: {
        token: localStorage.getItem("tkn"),
      },
    });
  }

  // React Query (fetch + cache)
  const { data, isError, isLoading, error , refetch} = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,

    // refetchInterval: 2000,

    // refetchOnMount: false,

    // retry: 1,

    // retryDelay: 2000

    // staleTime: 3000

    // gcTime: 3000

    // enabled: isUserAuthenticated && isAuthorized
  });

  if (isLoading) {
    return <LoaderPage />;
  }

  if (isError) {
    return (
      <h1 className="text-center text-red-600 font-bold">
        Unfortunately, {error.message}
      </h1>
    );
  }

  // ✅ at this point, data is guaranteed to exist
  const allPosts = data?.data.posts;
  return (
    <>
      {/* <button className="btn cursor-pointer" onClick={refetch}>Click</button> */}
      <div className="w-1/2 mx-auto flex flex-col gap-3">
        {allPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
