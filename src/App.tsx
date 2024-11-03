import { useEffect, useState } from "react";
import axios from "axios";

enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type RequestState =
  | { status: RequestStatus.Loading }
  | { status: RequestStatus.Success; data: Post[] }
  | { status: RequestStatus.Error; errorMsg: string };

function App() {
  const [request, setRequest] = useState<RequestState>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // Grab latest 20 posts and reverse to show latest post on top
        const latestPosts = response.data.slice(-20).reverse();
        setRequest({ status: RequestStatus.Success, data: latestPosts });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setRequest({ status: RequestStatus.Error, errorMsg: err.message });
        } else {
          setRequest({
            status: RequestStatus.Error,
            errorMsg: (err as Error).message,
          });
        }
      }
    };

    fetchPosts();
  }, []);

  if (request.status === RequestStatus.Loading) return <p>Loading...</p>;
  if (request.status === RequestStatus.Error) return <p>{request.errorMsg}</p>;

  return (
    <div className="p-20 flex flex-col gap-4 items-start">
      {request.data.map((post) => (
        <div key={post.id} className="p-4 border border-black">
          <p>User id: {post.userId}</p>
          <p>Post id: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
