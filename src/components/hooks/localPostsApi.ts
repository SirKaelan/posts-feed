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

export const addNewLocalPost = (post: NewPost): void => {
  const localPosts = getFromLocalStorage<LocalPosts>(localPostsKey, {
    nextId: 500,
    posts: [],
  });

  localPosts.posts.unshift({ ...post, id: localPosts.nextId++ });

  saveToLocalStorage<LocalPosts>(localPostsKey, localPosts);
};

export const getAllLocalPosts = (limit: number): Post[] => {
  const localPosts = getFromLocalStorage<LocalPosts>(localPostsKey, {
    nextId: 500,
    posts: [],
  });

  return localPosts.posts.slice(0, limit);
};

export const getAllLocalUserPosts = (
  selectedUserId: number,
  limit: number
): Post[] => {
  const localPosts = getFromLocalStorage<LocalPosts>(localPostsKey, {
    nextId: 500,
    posts: [],
  });

  const userPosts = localPosts.posts.filter(
    (post) => post.userId === selectedUserId
  );

  return userPosts.slice(0, limit);
};
