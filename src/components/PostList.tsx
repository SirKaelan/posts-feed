import { Post, RequestState, RequestStatus, User } from "../types";
import { deleteFromLocalStorage } from "../utils/localStorage";

type PostListProps = {
  posts: RequestState<Post[]>;
  currentUser: User | null;
  setPosts: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>;
};

export const PostList = ({ posts, currentUser, setPosts }: PostListProps) => {
  const handleDeletePost = (post: Post) => {
    if (!currentUser) return;

    // Remove post from local storage
    deleteFromLocalStorage<Post>(
      currentUser.id.toString(),
      (lsPost) => post.id === lsPost.id
    );

    // Update posts state
    setPosts((prevState) => {
      if (prevState.status === RequestStatus.Success) {
        const newPostsArr = prevState.data.filter(
          (oldPost) => oldPost.id !== post.id
        );
        return {
          status: RequestStatus.Success,
          data: [...newPostsArr],
        };
      } else {
        return prevState;
      }
    });
  };

  if (posts.status === RequestStatus.Loading) return <p>Loading...</p>;
  if (posts.status === RequestStatus.Error) return <p>Couldn't fetch posts!</p>;

  return (
    <div className="flex flex-col gap-4 items-start">
      {posts.data.length === 0 ? (
        <div>No posts!</div>
      ) : (
        posts.data.map((post) => (
          <div key={post.id} className="p-4 border border-black">
            {currentUser && currentUser?.id === post.userId && (
              <button onClick={() => handleDeletePost(post)}>X</button>
            )}
            <p>User id: {post.userId}</p>
            <p>Post id: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};
