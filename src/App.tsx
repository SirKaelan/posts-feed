import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts?_limit=20")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Errors fetching data:", error);
      });
  }, []);

  return (
    <div className="p-20 flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id}>
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
