import { usePostsContext } from "../contexts/posts/PostsContext";

export const usePosts = () => {
  const { posts } = usePostsContext();

  return { posts };
};
