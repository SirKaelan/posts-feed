import { usePostsContext } from "../contexts/posts/PostsContext";

export const useUsers = () => {
  const { selectedUserId, setSelectedUserId } = usePostsContext();

  return { selectedUserId, setSelectedUserId };
};
