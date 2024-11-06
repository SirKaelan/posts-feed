import { useEffect } from "react";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { getAllUsers } from "./usersApi";
import { RequestStatus } from "../../types";

export const useUsers = () => {
  const { users, setUsers, loggedInUser } = usePostsContext();

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data.status === RequestStatus.Error) {
        setUsers(data);
      } else if (data.status === RequestStatus.Success) {
        setUsers({
          status: RequestStatus.Success,
          data: [...data.data, loggedInUser],
        });
      }
    });
  }, [setUsers, loggedInUser]);
  return users;
};
