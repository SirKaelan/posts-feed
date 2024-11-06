import { NewPost } from "../../types";
import { usePostsContext } from "../contexts/posts/PostsContext";
import { addNewLocalPost } from "./localPostsApi";
import { sendNewPost } from "./postsApi";

export const useCreatePost = () => {
  const { reloadPosts } = usePostsContext();

  const createPost = (post: NewPost): void => {
    addNewLocalPost(post);
    sendNewPost(post).catch((err) => console.error(err));
    reloadPosts();
  };

  return { createPost };
};
