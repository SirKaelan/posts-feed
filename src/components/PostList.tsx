import { PostCard } from "./PostCard";
import { Loading } from "./Loading";
import { Error } from "./Error";

import { usePosts } from "./hooks/usePosts";
import { useLoggedInUser } from "./hooks/useLoggedInUser";
import { useUsers } from "./hooks/useUsers";
import { useDeletePost } from "./hooks/useDeletePost";

import { Post, RequestStatus } from "../types";

export const PostList = () => {
  const { posts } = usePosts();
  const { users } = useUsers();
  const { deletePost } = useDeletePost();
  const { loggedInUser } = useLoggedInUser();

  const handleDeleteClick = (post: Post) => {
    deletePost(post);
  };

  if (posts.status === RequestStatus.Loading) return <Loading text="loading" />;
  if (posts.status === RequestStatus.Error)
    return <Error text="couldn't fetch posts!" />;

  return (
    <div className="flex justify-center gap-8 flex-wrap xl:gap-14">
      {posts.data.length === 0 ? (
        <div>This user has no posts!</div>
      ) : (
        posts.data.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            users={users}
            loggedInUser={loggedInUser}
            handleDelete={handleDeleteClick}
          />
        ))
      )}
    </div>
  );
};
