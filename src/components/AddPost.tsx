import { useState } from "react";
import { NewPostForm } from "./NewPostForm";
import { Post, RequestState, User } from "../types";

type AddPostProps = {
  currentUser: User;
  setPosts: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>;
};

export const AddPost = ({ currentUser, setPosts }: AddPostProps) => {
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
          currentUser={currentUser}
          handleCloseClick={handleFormCloseClick}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};
