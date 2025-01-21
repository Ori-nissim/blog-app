import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsPending(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();

      // Update context with the new post
      setPosts([newPost, ...posts]);
      navigate("/");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="h-full md:w-2/3 lg:w-1/2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              placeholder="Enter post title..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Body
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={isPending}
              placeholder="Enter post content..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Post"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300"
              disabled={isPending}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
