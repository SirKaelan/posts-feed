import { useState } from "react";
import { NewPostForm } from "./NewPostForm";

export const AddPost = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleNewPostClick = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={handleNewPostClick}
        className="border border-black py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition"
      >
        Add New Post +
      </button>

      {showForm && <NewPostForm />}
    </div>
  );
};
