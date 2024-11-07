import { createContext, useContext } from "react";
import { Post, RequestState, User } from "../../../types";

type AppStateContextType = {
  posts: RequestState<Post[]>;
  setPosts: React.Dispatch<React.SetStateAction<RequestState<Post[]>>>;
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  users: RequestState<User[]>;
  setUsers: React.Dispatch<React.SetStateAction<RequestState<User[]>>>;
  loggedInUser: User;
  reloadPosts: (userId: number | null) => void;
};

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error("useAppStateContext must be within a AppStateProvider");
  return context;
};
