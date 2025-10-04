export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SearchParams<T> {
  page?: number;
  pageSize?: number;
  search?: string;
  filters?: Record<string, any>;
  sortColumn?: keyof T | null;
  sortDirection?: "asc" | "desc";
}

export interface BaseEndpoints {
  BASE: string;
  GET_ALL?: string | (() => string);
  GET_BY_ID?: (id: string) => string;
  UPDATE?: (id: string) => string;
  DELETE?: (id: string) => string;
  // Allow custom endpoints via index signature
  [key: string]: any;
}

export interface ListMixin<T> {
  getAll(params?: SearchParams<T>): Promise<PaginatedResponse<T>>;
}

export interface CreateMixin<T> {
  create(data: T): Promise<T>;
}
export interface GetMixin<T> {
  getById(id: string): Promise<T>;
}
export interface UpdateMixin<T> {
  update(id: string, data: T): Promise<T>;
}
export interface DeleteMixin<T> {
  delete(id: string, data: T): Promise<T>;
}

export interface ApiError {
  status?: number;
  message: string;
  errors?: Record<string, string[]>; // field-specific errors
  data?: any; // optional detailed error payload
}