import { RequestStatus, type DataState, type Post, type User } from "../types";
import { capitalizeFirstLetter, truncateText } from "../utils/utils";

const cardTitleLength = 15;
const cardBodyLength = 160;

type PostProps = {
  post: Post;
  users: DataState<User[]>;
  loggedInUser: User;
  handleDelete: (post: Post) => void;
};

export const PostCard = ({
  post,
  users,
  loggedInUser,
  handleDelete,
}: PostProps) => {
  const postTitle = `${post.id}: ${capitalizeFirstLetter(
    truncateText(post.title, cardTitleLength)
  )}`;
  const postText = capitalizeFirstLetter(
    truncateText(post.body, cardBodyLength)
  );
  const postAuthor =
    users.status === RequestStatus.Success &&
    users.data.find((user) => user.id === post.userId)?.username;

  return (
    <div className="flex flex-col gap-4 w-72 p-4 border border-gray-400 rounded-lg transition relative hover:cursor-pointer hover:shadow-xl hover:-translate-y-2 md:p-7">
      {loggedInUser.id === post.userId && (
        // TODO: Make into a Close Button component
        <button
          onClick={() => handleDelete(post)}
          className="absolute top-4 right-4 py-2 px-3 leading-none rounded-md text-gray-400 transition hover:text-white hover:bg-red-500"
        >
          &#10005;
        </button>
      )}
      <h2 className="font-bold text-gray-700 text-xl">{postTitle}</h2>

      <p className="text-sm text-gray-600">{postText}</p>

      <div className="text-gray-500 text-xs text-right mt-auto">
        Written by <span className="font-bold">{postAuthor}</span>
      </div>
    </div>
  );
};
