import { useAppStateContext } from "../contexts/app/AppStateContext";

export const useLoggedInUser = () => {
  const { loggedInUser } = useAppStateContext();

  return { loggedInUser };
};
