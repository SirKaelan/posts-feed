import { useEffect } from "react";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { RequestStatus } from "../../types";
import { config } from "../../config";

import { getAllPosts, getUserPosts } from "./jsonPlaceholderApi";

export const usePosts = () => {
  const { posts, setPosts } = usePostsContext();

  useEffect(() => {
    setPosts({ status: RequestStatus.Loading });

    getAllPosts(config.postsDisplayLimit).then((data) => setPosts(data));
  }, [setPosts]);

  return posts;
};
