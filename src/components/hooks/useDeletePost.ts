import { Post } from "../../types";
import { useAppStateContext } from "../contexts/app/AppStateContext";
import { deleteLocalPost } from "./localPostsApi";

export const useDeletePost = () => {
  const { reloadPosts, selectedUserId } = useAppStateContext();

  const deletePost = (post: Post): void => {
    deleteLocalPost(post);
    reloadPosts(selectedUserId);
  };

  return { deletePost };
};
