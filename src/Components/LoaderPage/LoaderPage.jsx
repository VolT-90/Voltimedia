import React from "react";
import { MoonLoader } from "react-spinners";

export default function LoaderPage() {
  return (
    <>
      <div className="flex flex-col items-center pt-60 h-screen">
        <div className="flex items-center pb-2 gap-2">
          <i className="fa-solid fa-bolt text-blue-700" />
          <p className="self-center text-2xl font-bold whitespace-nowrap dark:text-black">
            Voltmedia
          </p>
        </div>
        <div>
          <MoonLoader size={30} color="blue" />
        </div>
      </div>
    </>
  );
}
