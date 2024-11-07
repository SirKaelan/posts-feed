import { useAppStateContext } from "../contexts/app/AppStateContext";

export const useUsers = () => {
  const { users } = useAppStateContext();

  return { users };
};
