import { NewPost } from "../../types";
import { sendNewPost } from "./postsApi";

export const useCreatePost = () => {
  const createPost = (post: NewPost): void => {
    sendNewPost(post).catch((err) => console.error(err));
  };

  return { createPost };
};
