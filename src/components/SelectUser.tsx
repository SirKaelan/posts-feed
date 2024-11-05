import { RequestState, RequestStatus, User } from "../types";

type SelectUserProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedUser: number | "all";
  users: RequestState<User[]>;
};

export const SelectUser = ({
  handleChange,
  selectedUser,
  users,
}: SelectUserProps) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row">
      <label htmlFor="users">Get posts for:</label>
      <select
        className="border border-gray-400 rounded"
        id="users"
        value={selectedUser}
        onChange={handleChange}
      >
        <option value="all">All</option>
        {users.status === RequestStatus.Success &&
          users.data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
      </select>
    </div>
  );
};
