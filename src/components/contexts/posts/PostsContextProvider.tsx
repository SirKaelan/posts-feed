import { useState } from "react";
import { Post, RequestState, RequestStatus, User } from "../../../types";
import { PostsContext } from "./PostsContext";

type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<RequestState<Post[]>>({
    status: RequestStatus.Loading,
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<RequestState<User[]>>({
    status: RequestStatus.Loading,
  });
  const loggedInUser: User = {
    id: 420,
    name: "You Youer",
    username: "You",
    email: "you@test.com",
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        selectedUserId,
        setSelectedUserId,
        users,
        setUsers,
        loggedInUser,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
