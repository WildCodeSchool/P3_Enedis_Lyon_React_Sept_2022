import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Navbar/Avatar";

function CreatePostContainer() {
  return (
    <div className="md:pt-10">
      <div className="bg-white shadow-md rounded-t-sm border-t border-gray-100 flex items-center justify-center p-6 md:h-28 md:rounded-lg ">
        <div className="rounded-full object-cover mr-3">
          <Avatar />
        </div>

        <div className="border border-primary w-5/6 rounded-xl h-10 pt-2">
          <Link to="/createPost" className=" block">
            <span className="ml-2 text-gray-400">Votre publication...</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePostContainer;
