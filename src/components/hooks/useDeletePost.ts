import { Post } from "../../types";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { deleteLocalPost } from "./localPostsApi";

export const useDeletePost = () => {
  const { reloadPosts, selectedUserId } = usePostsContext();

  const deletePost = (post: Post): void => {
    deleteLocalPost(post);
    reloadPosts(selectedUserId);
  };

  return { deletePost };
};
