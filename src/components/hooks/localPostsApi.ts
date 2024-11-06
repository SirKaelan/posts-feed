import { NewPost, Post } from "../../types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

const localPostsKey = "newPosts";

type LocalPosts = {
  nextId: number;
  posts: Post[];
};

const initialLsValue = {
  nextId: 101,
  posts: [],
};

export const addLocalPost = (post: NewPost): void => {
  const localPosts = getFromLocalStorage<LocalPosts>(
    localPostsKey,
    initialLsValue
  );

  localPosts.posts.unshift({ ...post, id: localPosts.nextId++ });

  saveToLocalStorage<LocalPosts>(localPostsKey, localPosts);
};

export const deleteLocalPost = (post: Post): void => {
  const localPosts = getFromLocalStorage<LocalPosts>(
    localPostsKey,
    initialLsValue
  );

  const modifiedLocalPosts = localPosts.posts.filter(
    (localPost) => !(localPost.id === post.id)
  );

  saveToLocalStorage<LocalPosts>(localPostsKey, {
    ...localPosts,
    posts: modifiedLocalPosts,
  });
};

export const getLocalPosts = (limit: number): Post[] => {
  const localPosts = getFromLocalStorage<LocalPosts>(
    localPostsKey,
    initialLsValue
  );

  return localPosts.posts.slice(0, limit);
};

export const getLocalPostsByUserId = (
  selectedUserId: number,
  limit: number
): Post[] => {
  const localPosts = getFromLocalStorage<LocalPosts>(
    localPostsKey,
    initialLsValue
  );

  const userPosts = localPosts.posts.filter(
    (post) => post.userId === selectedUserId
  );

  return userPosts.slice(0, limit);
};
