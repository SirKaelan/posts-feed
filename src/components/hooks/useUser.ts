import { usePostsContext } from "../contexts/posts/PostsContext";

export const useUser = () => {
  const { selectedUserId, setSelectedUserId } = usePostsContext();

  return { selectedUserId, setSelectedUserId };
};
