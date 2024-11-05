export enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export type ErrorStatus = { status: RequestStatus.Error; errorMsg: string };
export type SuccessStatus<T> = { status: RequestStatus.Success; data: T };

export type RequestState<T> =
  | { status: RequestStatus.Loading }
  | SuccessStatus<T>
  | ErrorStatus;
