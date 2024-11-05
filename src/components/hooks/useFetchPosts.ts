import { useState, useEffect } from "react";
import {
  RequestStatus,
  RequestState,
  ErrorStatus,
  SuccessStatus,
  Post,
} from "../../types";
import axios from "axios";

export const useFetchPosts = (selectedUser: number | "all", limit: number) => {
  const [posts, setPosts] = useState<RequestState<Post[]>>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    setPosts({ status: RequestStatus.Loading });

    if (selectedUser === "all") {
      const postsRequest = fetchPosts();
      addPostsToState(postsRequest, setPosts, limit);
    } else {
      const postsRequest = fetchPosts(selectedUser);
      addPostsToState(postsRequest, setPosts, limit);
    }
  }, [selectedUser, limit]);

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
  limit: number
) => {
  request.then((posts) => {
    if (posts.status === RequestStatus.Success) {
      posts.data = posts.data.slice(-limit).reverse();
      setState(posts);
    } else {
      setState(posts);
    }
  });
};
