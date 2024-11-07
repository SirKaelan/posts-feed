import { useState } from "react";
import { SelectUser } from "./SelectUser";
import { PostForm } from "./PostForm";
import { useUsers } from "./hooks/useUsers";
import { RequestStatus } from "../types";
import { Button } from "./Button";

export const Header = () => {
  const { users } = useUsers();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormCloseClick = () => {
    setShowForm(false);
  };

  return (
    <header className="flex flex-col-reverse gap-6 justify-between items-center md:flex-row">
      <SelectUser />
      {users.status === RequestStatus.Success && (
        <Button handleClick={handleButtonClick}>Add New Post</Button>
      )}

      {showForm && <PostForm closeForm={handleFormCloseClick} />}
    </header>
  );
};
