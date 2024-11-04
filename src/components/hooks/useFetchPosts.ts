import { useState, useEffect } from "react";
import { RequestStatus } from "../../types";
import axios from "axios";

type RequestState<T> =
  | { status: RequestStatus.Loading }
  | { status: RequestStatus.Success; data: T }
  | { status: RequestStatus.Error; errorMsg: string };

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const useFetchPosts = (postsForUserId: number | "all") => {
  const [posts, setPosts] = useState<RequestState<Post[]>>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    const fetchPosts = async (userId?: number) => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: userId ? { userId } : {},
          }
        );
        // Grab latest 20 posts and reverse to show latest post on top
        const latestPosts = response.data.slice(-20).reverse();
        setPosts({ status: RequestStatus.Success, data: latestPosts });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setPosts({ status: RequestStatus.Error, errorMsg: err.message });
        } else {
          setPosts({
            status: RequestStatus.Error,
            errorMsg: (err as Error).message,
          });
        }
      }
    };

    setPosts({ status: RequestStatus.Loading });

    if (postsForUserId === "all") {
      fetchPosts();
    } else {
      fetchPosts(postsForUserId);
    }
  }, [postsForUserId]);

  return posts;
};
