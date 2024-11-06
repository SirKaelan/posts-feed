import { useState } from "react";
import { Post, RequestState, RequestStatus } from "../../../types";
import { PostsContext } from "./PostsContext";

type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<RequestState<Post[]>>({
    status: RequestStatus.Loading,
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, selectedUserId, setSelectedUserId }}
    >
      {children}
    </PostsContext.Provider>
  );
};
