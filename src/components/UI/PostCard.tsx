import React from "react";
import { Link } from "react-router-dom";

interface PostProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <Link
        to={`/post/${post.id}`}
        className="text-blue-500 hover:underline font-semibold"
      >
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
