import axios from "axios";
import {
  ErrorStatus,
  NewPost,
  Post,
  RequestStatus,
  SuccessStatus,
} from "../../types";

const url = "https://jsonplaceholder.typicode.com/posts";

export const getAllPosts = async (
  limit: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const posts = await fetchAllPosts();

  if (posts.status === RequestStatus.Error) {
    return posts;
  }

  const limitedPosts = limitPosts(posts.data, limit);
  return { ...posts, data: limitedPosts };
};

export const getUserPosts = async (
  userId: number,
  limit: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const posts = await fetchUserPosts(userId);

  if (posts.status === RequestStatus.Error) {
    return posts;
  }

  const limitedPosts = limitPosts(posts.data, limit);
  return { ...posts, data: limitedPosts };
};

// Helper functions
const limitPosts = (posts: Post[], limit: number): Post[] => {
  return posts.sort((a, b) => b.id - a.id).slice(0, limit);
};

// API Functions
export const sendNewPost = async (post: NewPost): Promise<void> => {
  try {
    await axios.post<Post>(url, post);
  } catch (err) {
    console.error(err);
  }
};

const fetchAllPosts = async (): Promise<
  SuccessStatus<Post[]> | ErrorStatus
> => {
  try {
    const { data } = await axios.get<Post[]>(url);

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
    const { data } = await axios.get<Post[]>(url, {
      params: {
        userId,
      },
    });

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
