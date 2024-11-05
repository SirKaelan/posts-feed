import { useState } from "react";
import { useFetchUsers } from "./components/hooks/useFetchUsers";
import { PostList } from "./components/PostList";
import { SelectUser } from "./components/SelectUser";
import { SelectUserAccount } from "./components/SelectUserAccount";
import { AddPost } from "./components/AddPost";
import { SelectChangeEvent } from "./types";
import { useFetchPosts } from "./components/hooks/useFetchPosts";

function App() {
  const [selectedUser, setSelectedUser] = useState<number | "all">("all");
  const [loggedUser, setLoggedUser] = useState<number>(1);
  const users = useFetchUsers();
  const { posts, setPosts } = useFetchPosts(selectedUser, 20);

  const handleUserChange = (e: SelectChangeEvent) => {
    const userId = e.target.value === "all" ? "all" : Number(e.target.value);
    setSelectedUser(userId);
  };

  const handleAccountChange = (e: SelectChangeEvent) => {
    setLoggedUser(Number(e.target.value));
  };

  return (
    <div className="p-20 flex flex-col gap-4">
      <SelectUserAccount
        loggedUser={loggedUser}
        users={users}
        handleChange={handleAccountChange}
      />
      <div className="flex justify-between items-center">
        <SelectUser
          selectedUser={selectedUser}
          users={users}
          handleChange={handleUserChange}
        />
        <AddPost loggedUser={loggedUser} setPosts={setPosts} />
      </div>
      <PostList posts={posts} />
    </div>
  );
}

export default App;
