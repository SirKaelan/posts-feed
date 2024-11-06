import { usePostsContext } from "../contexts/posts/PostsContext";

export const useUsers = () => {
  const { users } = usePostsContext();

  return { users };
};
