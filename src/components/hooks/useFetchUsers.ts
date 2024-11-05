import { useEffect, useState } from "react";
import {
  RequestState,
  RequestStatus,
  ErrorStatus,
  SuccessStatus,
  User,
} from "../../types";
import axios from "axios";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<RequestState<User[]>>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    setUsers({ status: RequestStatus.Loading });

    const usersRequest = fetchUsers();
    usersRequest.then((users) => {
      if (users.status === RequestStatus.Success) {
        setUsers(users);
      } else {
        setUsers(users);
      }
    });
  }, []);

  return users;
};

const fetchUsers = async (): Promise<SuccessStatus<User[]> | ErrorStatus> => {
  try {
    const { data } = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return {
      status: RequestStatus.Success,
      data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: RequestStatus.Error,
        errorMsg: err.message,
      };
    } else {
      return {
        status: RequestStatus.Error,
        errorMsg: (err as Error).message,
      };
    }
  }
};
