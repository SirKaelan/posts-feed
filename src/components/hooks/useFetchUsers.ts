import { useEffect, useState } from "react";
import { RequestState, RequestStatus } from "../../types";
import axios from "axios";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<RequestState<User[]>>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers({ status: RequestStatus.Success, data: response.data });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setUsers({ status: RequestStatus.Error, errorMsg: err.message });
        } else {
          setUsers({
            status: RequestStatus.Error,
            errorMsg: (err as Error).message,
          });
        }
      }
    };

    fetchUsers();
  }, []);

  return users;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
