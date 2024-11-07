import { ErrorStatus, Post, RequestStatus, SuccessStatus } from "../../types";

import { getAllPosts, getUserPosts } from "./postsApi";
import { getLocalPosts, getLocalPostsByUserId } from "./localPostsApi";

const postsDisplayLimit = 20;

export const loadPosts = async (selectedUserId: number | null) => {
  if (selectedUserId) {
    return await grabPostsByUserId(selectedUserId);
  } else {
    return await grabAllPosts();
  }
};

const grabAllPosts = async (): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const localPosts = getLocalPosts(postsDisplayLimit);
  if (localPosts.length === postsDisplayLimit) {
    return { status: RequestStatus.Success, data: localPosts };
  }

  const apiPosts = await getAllPosts(postsDisplayLimit - localPosts.length);
  if (apiPosts.status === RequestStatus.Error) return apiPosts;

  return { ...apiPosts, data: [...localPosts, ...apiPosts.data] };
};

const grabPostsByUserId = async (
  selectedUserId: number
): Promise<SuccessStatus<Post[]> | ErrorStatus> => {
  const localUserPosts = getLocalPostsByUserId(
    selectedUserId,
    postsDisplayLimit
  );
  if (localUserPosts.length > 0) {
    return { status: RequestStatus.Success, data: localUserPosts };
  }

  const apiUserPosts = await getUserPosts(selectedUserId, postsDisplayLimit);
  if (apiUserPosts.status === RequestStatus.Error) return apiUserPosts;

  return apiUserPosts;
};
