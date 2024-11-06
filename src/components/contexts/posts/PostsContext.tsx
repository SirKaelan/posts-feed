import { createContext, useContext } from "react";
import { Post, RequestState } from "../../../types";

type PostsContextType = {
  posts: RequestState<Post[]>;
  setPosts: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>;
};

export const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error("usePostsContext must be within a PostsProvider");
  return context;
};
