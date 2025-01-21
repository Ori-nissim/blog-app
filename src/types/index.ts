export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface Comment {
    id: number;
    postId: number;
    name: string;
    body: string;
  }
  
  export interface PostCreateInput {
    title: string;
    body: string;
  }

  export interface PostsContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (newPost: Post) => void;
  }
  