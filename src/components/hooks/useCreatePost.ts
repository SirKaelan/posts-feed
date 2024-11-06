import { NewPost } from "../../types";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { addLocalPost } from "./localPostsApi";
import { sendNewPost } from "./postsApi";

export const useCreatePost = () => {
  const { setSelectedUserId, loggedInUser, reloadPosts } = usePostsContext();

  const createPost = (post: NewPost): void => {
    addLocalPost(post);
    sendNewPost(post).catch((err) => console.error(err));
    setSelectedUserId(loggedInUser.id);
    reloadPosts(loggedInUser.id);
  };

  return { createPost };
};
