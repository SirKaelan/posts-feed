import { useState } from "react";
import { useFetchUsers } from "./components/hooks/useFetchUsers";
import { PostList } from "./components/PostList";
import { SelectUser } from "./components/SelectUser";
import { AddPost } from "./components/AddPost";
import { RequestStatus, User } from "./types";
import { useFetchPosts } from "./components/hooks/useFetchPosts";

function App() {
  const [selectedUser, setSelectedUser] = useState<number | "all">("all"); // filter
  const users = useFetchUsers();
  const currentUser: User | null =
    users.status === RequestStatus.Success
      ? users.data[users.data.length - 1]
      : null;
  const { posts, setPosts } = useFetchPosts(selectedUser, currentUser);

  return (
    <div className="p-10 flex flex-col gap-10 md:p-20">
      <div className="flex flex-col-reverse gap-6 justify-between items-center md:flex-row">
        <SelectUser users={users} />
        {currentUser && (
          <AddPost
            currentUser={currentUser}
            selectedUser={selectedUser}
            setPosts={setPosts}
          />
        )}
      </div>
      <PostList users={users} currentUser={currentUser} setPosts={setPosts} />
    </div>
  );
}

export default App;
