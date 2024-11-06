import { createContext, useContext } from "react";
import { Post, RequestState, User } from "../../../types";

type PostsContextType = {
  posts: RequestState<Post[]>;
  setPosts: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>;
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  users: RequestState<User[]>;
  setUsers: React.Dispatch<React.SetStateAction<RequestState<User[]>>>;
  loggedInUser: User;
  reloadPosts: () => void;
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
