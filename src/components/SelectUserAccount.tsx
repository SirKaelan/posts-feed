import { RequestState, RequestStatus, User } from "../types";

type SelectUserAccountProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  loggedUser: number;
  users: RequestState<User[]>;
};

export const SelectUserAccount = ({
  handleChange,
  loggedUser,
  users,
}: SelectUserAccountProps) => {
  return (
    <div className="flex gap-2 self-end">
      <label htmlFor="logged-user">Logged in as:</label>
      <select
        id="logged-user"
        value={loggedUser}
        onChange={handleChange}
        className="border border-black"
      >
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
