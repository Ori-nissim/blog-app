import { PostCreateInput } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Get all posts
export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

// Get single post
export async function getPost(id: number) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

// Get comments for a post
export async function getComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

// Create new post
export async function createPost(post: PostCreateInput) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}
