import { useEffect, useMemo, useState } from "react";
import {
  Post,
  DataState,
  RequestStatus,
  SuccessStatus,
  User,
} from "../../../types";
import { AppStateContext } from "./AppStateContext";
import { loadPosts } from "../../hooks/mergedPostsApi";
import { getAllUsers } from "../../hooks/usersApi";

type AppStateProviderProps = {
  children: React.ReactNode;
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [posts, setPosts] = useState<DataState<Post[]>>({
    status: RequestStatus.Loading,
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<DataState<User[]>>({
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

  const reloadPosts = (userId: number | null): void => {
    loadPosts(userId).then((data) => setPosts(data));
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
    <AppStateContext.Provider
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
    </AppStateContext.Provider>
  );
};
