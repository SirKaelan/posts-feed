import { useFetchPosts } from "./hooks/useFetchPosts";
import { RequestStatus } from "../types";

type PostListProps = {
  selectedUser: number | "all";
  limit: number;
};

export const PostList = ({ selectedUser, limit }: PostListProps) => {
  const posts = useFetchPosts(selectedUser, limit);

  if (posts.status === RequestStatus.Loading) return <p>Loading...</p>;
  if (posts.status === RequestStatus.Error) return <p>Couldn't fetch posts!</p>;

  return (
    <div className="flex flex-col gap-4 items-start">
      {posts.data.map((post) => (
        <div key={post.id} className="p-4 border border-black">
          <p>User id: {post.userId}</p>
          <p>Post id: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  );
};
