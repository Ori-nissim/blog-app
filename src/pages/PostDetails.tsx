import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getComments } from "../lib/api";
import { Post, Comment } from "../types";

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setPostLoading(true);
      setPostError(null);

      try {
        const data = await getPost(Number(postId));
        setPost(data);
      } catch (err: any) {
        setPostError("Failed to load post details.");
      } finally {
        setPostLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;
      setCommentsLoading(true);
      setCommentsError(null);

      try {
        const data = await getComments(Number(postId));
        setComments(data);
      } catch (err: any) {
        setCommentsError("Failed to load comments.");
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (postLoading) {
    return (
      <div className="text-center text-black">Loading post details...</div>
    );
  }

  if (postError) {
    return <div className="text-center text-red-500">{postError}</div>;
  }

  if (commentsLoading) {
    return <div className="text-center text-black">Loading comments...</div>;
  }

  if (commentsError) {
    return <div className="text-center text-red-500">{commentsError}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post?.title}</h1>
        <p className="text-gray-700 mb-6">{post?.body}</p>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Comments:
          </h2>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-bold text-gray-900">{comment.name}</p>
                <p className="text-gray-700">{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mb-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
