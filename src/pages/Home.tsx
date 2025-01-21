import React, { useState, useEffect } from "react";
import { getPosts } from "../lib/api";
import { usePosts } from "../context/PostContext";
import PostCard from "../components/UI/PostCard";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { posts, setPosts } = usePosts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch posts only if the context is empty
  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length > 0) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err: any) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [posts, setPosts]);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading && posts.length === 0) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (error && posts.length === 0) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Posts</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Type a post title to search..."
          className="w-full md:w-1/2 border bg-gray-50 text-gray-800 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredPosts.length} posts matching your search
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
