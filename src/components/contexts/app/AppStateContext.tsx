import { createContext, useContext } from "react";
import { Post, DataState, User } from "../../../types";

type AppStateContextType = {
  posts: DataState<Post[]>;
  setPosts: React.Dispatch<React.SetStateAction<DataState<Post[]>>>;
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  users: DataState<User[]>;
  setUsers: React.Dispatch<React.SetStateAction<DataState<User[]>>>;
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
