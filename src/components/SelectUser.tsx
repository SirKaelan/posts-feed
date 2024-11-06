import { RequestState, RequestStatus, SelectChangeEvent, User } from "../types";
import { useUser } from "./hooks/useUser";
import { useUsers } from "./hooks/useUsers";

type SelectUserProps = {
  userz: RequestState<User[]>;
};

export const SelectUser = ({ userz }: SelectUserProps) => {
  const { selectedUserId, setSelectedUserId } = useUser();
  const users = useUsers();

  const handleUserChange = (e: SelectChangeEvent) => {
    const userId = e.target.value === "all" ? null : Number(e.target.value);
    setSelectedUserId(userId);
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row">
      <label htmlFor="users">Get posts for:</label>
      <select
        className="border border-gray-400 rounded"
        id="users"
        value={selectedUserId ?? "all"}
        onChange={handleUserChange}
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
