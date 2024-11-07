import { useAppStateContext } from "../contexts/app/AppStateContext";

export const usePosts = () => {
  const { posts } = useAppStateContext();

  return { posts };
};
