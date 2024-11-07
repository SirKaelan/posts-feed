import { PostList } from "./components/PostList";
import { Header } from "./components/Header";

function App() {
  return (
    <main className="p-10 flex flex-col gap-10 md:p-20">
      <Header />
      <PostList />
    </main>
  );
}

export default App;
