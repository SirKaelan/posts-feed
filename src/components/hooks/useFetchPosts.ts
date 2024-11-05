import { useState, useEffect } from "react";
import {
  RequestStatus,
  RequestState,
  ErrorStatus,
  SuccessStatus,
  Post,
  User,
} from "../../types";
import axios from "axios";
import { getAllLocalStorageValues } from "../../utils/localStorage";
import { config } from "../../config";

export const useFetchPosts = (
  selectedUser: number | "all",
  currentUser: User | null
) => {
  const [posts, setPosts] = useState<RequestState<Post[]>>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    setPosts({ status: RequestStatus.Loading });

    if (selectedUser === "all") {
      // Grab API and local storage posts
      const postsRequest = fetchPosts();
      const LSPosts = getAllLocalStorageValues<Post>().sort(
        (a, b) => a.id - b.id
      );
      // Add them to posts state
      addPostsToState(
        postsRequest,
        setPosts,
        config.postsDisplayLimit,
        LSPosts
      );
    } else {
      // Same logic, but taking into account the filter
      const postsRequest = fetchPosts(selectedUser);
      // Grab local storage posts only if you're looking at your own posts
      const LSPosts =
        selectedUser === currentUser?.id
          ? getAllLocalStorageValues<Post>()
              .filter((post) => post.userId === currentUser?.id)
              .sort((a, b) => a.id - b.id)
          : [];
      addPostsToState(
        postsRequest,
        setPosts,
        config.postsDisplayLimit,
        LSPosts
      );
    }
  }, [selectedUser, currentUser]);

  return { posts, setPosts };
};

// Fetching function
const fetchPosts = async (
  userId?: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: userId ? { userId } : {},
      }
    );

    return {
      status: RequestStatus.Success,
      data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: RequestStatus.Error, errorMsg: err.message };
    } else {
      return {
        status: RequestStatus.Error,
        errorMsg: (err as Error).message,
      };
    }
  }
};

const addPostsToState = (
  request: Promise<ErrorStatus | SuccessStatus<Post[]>>,
  setState: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>,
  limit: number,
  lsPosts: Post[]
) => {
  request.then((posts) => {
    if (posts.status === RequestStatus.Success) {
      // Merge posts slice a portion of them
      posts.data = [...posts.data, ...lsPosts]
        .slice(-limit)
        .sort((a, b) => b.id - a.id);
      setState(posts);
    } else {
      setState(posts);
    }
  });
};
