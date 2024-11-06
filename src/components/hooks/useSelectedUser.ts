import { usePostsContext } from "../contexts/posts/PostsContext";

export const useSelectedUser = () => {
  const { selectedUserId, setSelectedUserId } = usePostsContext();

  return { selectedUserId, setSelectedUserId };
};
