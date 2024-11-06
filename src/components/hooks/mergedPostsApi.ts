import { ErrorStatus, Post, RequestStatus, SuccessStatus } from "../../types";
import { config } from "../../config";

import { getAllPosts, getUserPosts } from "./postsApi";
import { getAllLocalPosts } from "./localPostsApi";

export const loadPosts = async (selectedUserId: number | null) => {
  if (selectedUserId) {
    return await getUserPosts(selectedUserId, config.postsDisplayLimit);
  } else {
    return await grabAllPosts();
  }
};

const grabAllPosts = async (): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const localPosts = getAllLocalPosts(config.postsDisplayLimit);
  if (localPosts.length === config.postsDisplayLimit) {
    return { status: RequestStatus.Success, data: localPosts };
  }

  const apiPosts = await getAllPosts(
    config.postsDisplayLimit - localPosts.length
  );
  if (apiPosts.status === RequestStatus.Error) return apiPosts;

  return { ...apiPosts, data: [...localPosts, ...apiPosts.data] };
};
