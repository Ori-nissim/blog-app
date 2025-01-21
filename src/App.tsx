import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./pages/PostDetails";
import { PostsProvider } from "./context/PostContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="new" element={<NewPost />} />
              <Route path="post/:postId" element={<PostDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </QueryClientProvider>
  );
}

export default App;
