import { useState } from "react";
import { PostList } from "./components/PostList";
import { SelectUser } from "./components/SelectUser";

function App() {
  const [selectedUser, setSelectedUser] = useState<number | "all">("all");

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value === "all" ? "all" : Number(e.target.value);
    setSelectedUser(userId);
  };

  return (
    <div className="p-20 flex flex-col gap-4">
      <SelectUser handleChange={handleUserChange} selectedUser={selectedUser} />
      <PostList selectedUser={selectedUser} limit={20} />
    </div>
  );
}

export default App;
