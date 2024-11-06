import { useEffect } from "react";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { RequestStatus } from "../../types";
import { config } from "../../config";

import { getAllPosts, getUserPosts } from "./jsonPlaceholderApi";

export const usePosts = () => {
  const { posts, setPosts, selectedUserId } = usePostsContext();

  useEffect(() => {
    setPosts({ status: RequestStatus.Loading });

    if (selectedUserId) {
      getUserPosts(selectedUserId, config.postsDisplayLimit).then((data) =>
        setPosts(data)
      );
    } else {
      getAllPosts(config.postsDisplayLimit).then((data) => setPosts(data));
    }
  }, [setPosts, selectedUserId]);

  return posts;
};
