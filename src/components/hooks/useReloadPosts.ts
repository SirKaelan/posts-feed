import { usePostsContext } from "../contexts/posts/PostsContext";

export const useReloadPosts = () => {
  const { reloadPosts } = usePostsContext();

  return { reloadPosts };
};
