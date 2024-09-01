import React from "react";
import { Link } from "react-router-dom";
import fileService from "../appwrite/fileService";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-full bg-slate-500 rounded-md p-4 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all duration-300">
        <div className="w-full justify-center mb-4 h-4/5">
          <img
            src={fileService.getImagePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
