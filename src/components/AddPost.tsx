import { useState } from "react";
import { NewPostForm } from "./NewPostForm";

export const AddPost = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleNewPostClick = () => {
    setShowForm(true);
  };

  const handleFormCloseClick = () => {
    setShowForm(false);
  };

  return (
    <div>
      <button
        onClick={handleNewPostClick}
        className="border border-gray-400 py-1 px-2 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Add New Post
      </button>

      {showForm && <NewPostForm closeForm={handleFormCloseClick} />}
    </div>
  );
};
