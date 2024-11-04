import { RequestStatus } from "../types";
import { useFetchUsers } from "./hooks/useFetchUsers";

type SelectUserProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedUser: number | "all";
};

export const SelectUser = ({ handleChange, selectedUser }: SelectUserProps) => {
  const users = useFetchUsers();

  return (
    <div className="flex gap-2">
      <label htmlFor="users">Get posts for:</label>
      <select
        className="border border-black"
        id="users"
        value={selectedUser}
        onChange={handleChange}
      >
        <option value="all">All</option>
        {users.status === RequestStatus.Success &&
          users.data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
    </div>
  );
};
