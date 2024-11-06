import { usePostsContext } from "../contexts/posts/PostsContext";

export const useLoggedInUser = () => {
  const { loggedInUser } = usePostsContext();

  return { loggedInUser };
};
