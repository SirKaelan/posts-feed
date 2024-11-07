import { useAppStateContext } from "../contexts/app/AppStateContext";

export const useSelectedUser = () => {
  const { selectedUserId, setSelectedUserId } = useAppStateContext();

  return { selectedUserId, setSelectedUserId };
};
