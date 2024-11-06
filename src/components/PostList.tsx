import { Post, RequestStatus } from "../types";
import { config } from "../config";

import { usePosts } from "./hooks/usePosts";
import { useLoggedInUser } from "./hooks/useLoggedInUser";
import { useUsers } from "./hooks/useUsers";
import { useDeletePost } from "./hooks/useDeletePost";

export const PostList = () => {
  const { posts } = usePosts();
  const { users } = useUsers();
  const { deletePost } = useDeletePost();
  const { loggedInUser } = useLoggedInUser();

  const handleDeleteClick = (post: Post) => {
    deletePost(post);
  };

  if (posts.status === RequestStatus.Loading) return <p>Loading...</p>;
  if (posts.status === RequestStatus.Error) return <p>Couldn't fetch posts!</p>;

  return (
    <div className="flex justify-center gap-8 flex-wrap xl:gap-14">
      {posts.data.length === 0 ? (
        <div>No posts!</div>
      ) : (
        posts.data.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-4 w-72 p-4 border border-gray-400 rounded-lg transition relative hover:cursor-pointer hover:shadow-xl hover:-translate-y-2 md:p-7"
          >
            {loggedInUser.id === post.userId && (
              <button
                onClick={() => handleDeleteClick(post)}
                className="absolute top-4 right-4 py-2 px-3 leading-none rounded-md text-gray-400 transition hover:text-white hover:bg-red-500"
              >
                &#10005;
              </button>
            )}
            <h2 className="font-bold text-gray-700 text-xl">
              {post.id}:{" "}
              {capitalizeFirstLetter(
                truncateText(post.title, config.cardTitleLength)
              )}
            </h2>
            <p className="text-sm text-gray-600">
              {capitalizeFirstLetter(
                truncateText(post.body, config.cardBodyLength)
              )}
            </p>
            <p className="text-gray-500 text-xs text-right mt-auto">
              Written by{" "}
              <span className="font-bold">
                {users.status === RequestStatus.Success &&
                  users.data.find((user) => user.id === post.userId)?.username}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const truncateText = (text: string, charLimit: number): string => {
  return text.length > charLimit
    ? text.substring(0, charLimit).trim() + "..."
    : text;
};

const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
