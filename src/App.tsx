import { useState } from "react";
import { useFetchUsers } from "./components/hooks/useFetchUsers";
import { PostList } from "./components/PostList";
import { SelectUser } from "./components/SelectUser";
import { AddPost } from "./components/AddPost";
import { RequestStatus, SelectChangeEvent, User } from "./types";
import { useFetchPosts } from "./components/hooks/useFetchPosts";

function App() {
  const [selectedUser, setSelectedUser] = useState<number | "all">("all"); // filter
  const users = useFetchUsers();
  const currentUser: User | null =
    users.status === RequestStatus.Success
      ? users.data[users.data.length - 1]
      : null;
  const { posts, setPosts } = useFetchPosts(selectedUser, currentUser);

  const handleUserChange = (e: SelectChangeEvent) => {
    const userId = e.target.value === "all" ? "all" : Number(e.target.value);
    setSelectedUser(userId);
  };

  return (
    <div className="p-10 flex flex-col gap-10 md:p-20">
      <div className="flex flex-col-reverse gap-6 justify-between items-center md:flex-row">
        <SelectUser
          selectedUser={selectedUser}
          users={users}
          handleChange={handleUserChange}
        />
        {currentUser && (
          <AddPost
            currentUser={currentUser}
            selectedUser={selectedUser}
            setPosts={setPosts}
          />
        )}
      </div>
      <PostList
        posts={posts}
        users={users}
        currentUser={currentUser}
        setPosts={setPosts}
      />
    </div>
  );
}

export default App;
