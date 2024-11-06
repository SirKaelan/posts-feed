import axios from "axios";
import {
  ErrorStatus,
  Post,
  RequestState,
  RequestStatus,
  SuccessStatus,
} from "../../types";

export const getAllPosts = async (
  limit: number
): Promise<RequestState<Post[]>> => {
  const posts = await fetchAllPosts();

  if (posts.status === RequestStatus.Error) {
    return { status: RequestStatus.Error, errorMsg: posts.errorMsg };
  }

  const limitedPosts = limitPosts(posts.data, limit);
  return { status: RequestStatus.Success, data: limitedPosts };
};

export const getUserPosts = async (
  userId: number,
  limit: number
): Promise<RequestState<Post[]>> => {
  const posts = await fetchUserPosts(userId);

  if (posts.status === RequestStatus.Error) {
    return { status: RequestStatus.Error, errorMsg: posts.errorMsg };
  }

  const limitedPosts = limitPosts(posts.data, limit);
  return { status: RequestStatus.Success, data: limitedPosts };
};

// Helper functions
const limitPosts = (posts: Post[], limit: number): Post[] => {
  return posts.sort((a, b) => b.id - a.id).slice(0, limit);
};

// API Functions
const fetchAllPosts = async (): Promise<
  SuccessStatus<Post[]> | ErrorStatus
> => {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
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

const fetchUserPosts = async (
  userId: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: userId,
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
