import { useState } from "react";
import { RequestStatus } from "./types";
import { useFetchPosts } from "./components/hooks/useFetchPosts";
import { useFetchUsers } from "./components/hooks/useFetchUsers";

function App() {
  const [postsForUserId, setSelectedUser] = useState<number | "all">("all");
  const users = useFetchUsers();
  const posts = useFetchPosts(postsForUserId);

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
