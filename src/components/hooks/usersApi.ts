import axios from "axios";
import { ErrorStatus, RequestStatus, SuccessStatus, User } from "../../types";

export const getAllUsers = async (): Promise<
  SuccessStatus<User[]> | ErrorStatus
> => {
  const users = await fetchAllUsers();

  return users;
};

const fetchAllUsers = async (): Promise<
  SuccessStatus<User[]> | ErrorStatus
> => {
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