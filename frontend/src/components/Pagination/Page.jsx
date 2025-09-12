import React from "react";

function Page({ pageNum, setPage }) {
  return (
    <button
      onClick={() => setPage(pageNum)}
      className="
        w-12 h-12 
        bg-gray-800 text-white 
        rounded-2xl shadow-lg 
        transition duration-200 
        hover:bg-blue-600 hover:scale-105 hover:shadow-xl
        cursor-pointer
      "
    >
      {pageNum}
    </button>
  );
}

export default Page;
