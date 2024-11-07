import { useAppStateContext } from "../contexts/app/AppStateContext";

export const useReloadPosts = () => {
  const { reloadPosts } = useAppStateContext();

  return { reloadPosts };
};
