import axios from "axios";
import { RequestState, RequestStatus, User } from "../../types";

export const getAllUsers = async (): Promise<RequestState<User[]>> => {
  const users: RequestState<User[]> = await fetchAllUsers();

  return users;
};

const fetchAllUsers = async (): Promise<RequestState<User[]>> => {
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
      return { status: RequestStatus.Error, errorMsg: err.message };
    } else {
      return {
        status: RequestStatus.Error,
        errorMsg: (err as Error).message,
      };
    }
  }
};
