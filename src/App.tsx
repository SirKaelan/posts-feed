import { useEffect, useState } from "react";
import axios from "axios";
import { RequestStatus } from "./types";
import { useFetchPosts } from "./components/hooks/useFetchPosts";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
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

export type ErrorStatus = {
  status: RequestStatus.Error;
  errorMsg: string;
};

type RequestState<T> =
  | { status: RequestStatus.Loading }
  | { status: RequestStatus.Success; data: T }
  | ErrorStatus;

function App() {
  const [users, setUsers] = useState<RequestState<User[]>>({
    status: RequestStatus.Loading,
  });
  const [postsForUserId, setSelectedUser] = useState<number | "all">("all");
  const posts = useFetchPosts(postsForUserId);

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

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value === "all" ? "all" : Number(e.target.value);
    setSelectedUser(userId);
  };

  return (
    <div className="p-20 flex flex-col gap-4 items-start">
      <div className="flex gap-2">
        <label htmlFor="users">Get posts for:</label>
        <select
          className="border border-black"
          id="users"
          value={postsForUserId}
          onChange={handleUserChange}
        >
          <option value="all">All</option>
          {users.status === RequestStatus.Success &&
            users.data.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      {posts.status === RequestStatus.Loading && <p>Loading...</p>}
      {posts.status === RequestStatus.Error && <p>Couldn't fetch posts!</p>}
      {posts.status === RequestStatus.Success &&
        posts.data.map((post) => (
          <div key={post.id} className="p-4 border border-black">
            <p>User id: {post.userId}</p>
            <p>Post id: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
