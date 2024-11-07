import { useState } from "react";
import { SelectUser } from "./SelectUser";
import { PostForm } from "./PostForm";
import { useUsers } from "./hooks/useUsers";
import { RequestStatus } from "../types";

export const Header = () => {
  const { users } = useUsers();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleNewPostClick = () => {
    setShowForm(true);
  };

  const handleFormCloseClick = () => {
    setShowForm(false);
  };

  return (
    <header className="flex flex-col-reverse gap-6 justify-between items-center md:flex-row">
      <SelectUser />
      {users.status === RequestStatus.Success && (
        // TODO: Make into a reusable button
        <button
          onClick={handleNewPostClick}
          className="border border-gray-400 py-1 px-2 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Add New Post
        </button>
      )}

      {showForm && <PostForm closeForm={handleFormCloseClick} />}
    </header>
  );
};
