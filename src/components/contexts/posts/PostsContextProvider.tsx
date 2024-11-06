import { useEffect, useMemo, useState } from "react";
import {
  Post,
  RequestState,
  RequestStatus,
  SuccessStatus,
  User,
} from "../../../types";
import { PostsContext } from "./PostsContext";
import { loadPosts } from "../../hooks/mergedPostsApi";
import { getAllUsers } from "../../hooks/usersApi";

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

  const loggedInUser: User = useMemo(
    () => ({
      id: 420,
      name: "You Youer",
      username: "You",
      email: "you@test.com",
    }),
    []
  );

  const reloadPosts = () => {
    loadPosts(selectedUserId).then((data) => setPosts(data));
  };

  useEffect(() => {
    setPosts({ status: RequestStatus.Loading });
    loadPosts(selectedUserId).then((data) => setPosts(data));
  }, [selectedUserId, setPosts]);

  useEffect(() => {
    getAllUsers().then((data) => {
      const updatedUsers =
        data.status === RequestStatus.Error
          ? data
          : ({
              ...data,
              data: [...data.data, loggedInUser],
            } as SuccessStatus<User[]>);

      setUsers(updatedUsers);
    });
  }, [loggedInUser, setUsers]);

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
        reloadPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
