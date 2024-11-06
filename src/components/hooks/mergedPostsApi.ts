import { ErrorStatus, Post, RequestStatus, SuccessStatus } from "../../types";
import { config } from "../../config";

import { getAllPosts, getUserPosts } from "./postsApi";
import { getLocalPosts, getLocalPostsByUserId } from "./localPostsApi";

export const loadPosts = async (selectedUserId: number | null) => {
  if (selectedUserId) {
    return await grabPostsByUserId(selectedUserId);
  } else {
    return await grabAllPosts();
  }
};

const grabAllPosts = async (): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const localPosts = getLocalPosts(config.postsDisplayLimit);
  if (localPosts.length === config.postsDisplayLimit) {
    return { status: RequestStatus.Success, data: localPosts };
  }

  const apiPosts = await getAllPosts(
    config.postsDisplayLimit - localPosts.length
  );
  if (apiPosts.status === RequestStatus.Error) return apiPosts;

  return { ...apiPosts, data: [...localPosts, ...apiPosts.data] };
};

const grabPostsByUserId = async (
  selectedUserId: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const localUserPosts = getLocalPostsByUserId(
    selectedUserId,
    config.postsDisplayLimit
  );
  if (localUserPosts.length > 0) {
    return { status: RequestStatus.Success, data: localUserPosts };
  }

  const apiUserPosts = await getUserPosts(
    selectedUserId,
    config.postsDisplayLimit
  );
  if (apiUserPosts.status === RequestStatus.Error) return apiUserPosts;

  return apiUserPosts;
};
