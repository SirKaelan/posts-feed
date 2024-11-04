import axios from "axios";
import { Post, ErrorStatus } from "src/App";
import { RequestStatus } from "src/types";

class PostsProvider {
  private url: string = "https://jsonplaceholder.typicode.com/posts";

  async getAllPosts(): Promise<PostsResponse> {
    try {
      const { data } = await axios.get<PostAPI[]>(this.url);
      const 
    } catch (e) {
      if (axios.isAxiosError(e)) {
      console.error(e);
      return { status: RequestStatus.Error, errorMsg: "Couldn't fetch posts" }
    }
  }
}

export const postsProvider = new PostsProvider();

type PostAPI = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type PostsResponse = Post[] | ErrorStatus;