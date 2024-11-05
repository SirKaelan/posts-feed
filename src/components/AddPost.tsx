import { useState } from "react";
import { NewPostForm } from "./NewPostForm";

type AddPostProps = {
  loggedUser: number;
};

export const AddPost = ({ loggedUser }: AddPostProps) => {
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
        className="border border-black py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition"
      >
        Add New Post +
      </button>

      {showForm && (
        <NewPostForm
          handleCloseClick={handleFormCloseClick}
          loggedUser={loggedUser}
        />
      )}
    </div>
  );
};
