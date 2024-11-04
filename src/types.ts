export enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export type RequestState<T> =
  | { status: RequestStatus.Loading }
  | { status: RequestStatus.Success; data: T }
  | { status: RequestStatus.Error; errorMsg: string };
