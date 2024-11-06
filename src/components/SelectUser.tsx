import { RequestStatus, SelectChangeEvent } from "../types";
import { useSelectedUser } from "./hooks/useSelectedUser";
import { useUsers } from "./hooks/useUsers";

export const SelectUser = () => {
  const { users } = useUsers();
  const { selectedUserId, setSelectedUserId } = useSelectedUser();

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
