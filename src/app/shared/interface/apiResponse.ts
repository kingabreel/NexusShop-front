export interface ApiResponse<T> {
  data: {
    content: T[];
  };
  message: string;
}