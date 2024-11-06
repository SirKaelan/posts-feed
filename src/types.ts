export enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export type LoadingStatus = { status: RequestStatus.Loading };
export type ErrorStatus = { status: RequestStatus.Error; errorMsg: string };
export type SuccessStatus<T> = { status: RequestStatus.Success; data: T };

export type RequestState<T> = LoadingStatus | SuccessStatus<T> | ErrorStatus;

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Event types
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
