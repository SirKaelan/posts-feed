import { Post, RequestState, RequestStatus } from "../types";

type PostListProps = {
  posts: RequestState<Post[]>;
};

export const PostList = ({ posts }: PostListProps) => {
  if (posts.status === RequestStatus.Loading) return <p>Loading...</p>;
  if (posts.status === RequestStatus.Error) return <p>Couldn't fetch posts!</p>;

  return (
    <div className="flex flex-col gap-4 items-start">
      {posts.data.length === 0 ? (
        <div>This user has no posts!</div>
      ) : (
        posts.data.map((post) => (
          <div key={post.id} className="p-4 border border-black">
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
