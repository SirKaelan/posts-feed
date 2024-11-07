import { NewPost } from "../../types";
import { useAppStateContext } from "../contexts/app/AppStateContext";
import { addLocalPost } from "./localPostsApi";
import { sendNewPost } from "./postsApi";

export const useCreatePost = () => {
  const { setSelectedUserId, loggedInUser, reloadPosts } = useAppStateContext();

  const createPost = (post: NewPost): void => {
    addLocalPost(post);
    sendNewPost(post).catch((err) => console.error(err));
    setSelectedUserId(loggedInUser.id);
    reloadPosts(loggedInUser.id);
  };

  return { createPost };
};
