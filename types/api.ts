export interface ApiResponse<T = any> {
  data?: T;
  error?: boolean;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}