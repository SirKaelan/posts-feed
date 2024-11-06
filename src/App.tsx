import { PostList } from "./components/PostList";
import { SelectUser } from "./components/SelectUser";
import { AddPost } from "./components/AddPost";

function App() {
  return (
    <div className="p-10 flex flex-col gap-10 md:p-20">
      <div className="flex flex-col-reverse gap-6 justify-between items-center md:flex-row">
        <SelectUser />
        <AddPost />
      </div>
      <PostList />
    </div>
  );
}

export default App;
