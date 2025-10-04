import type { SearchParams } from "../interface/BaseService.type";

export const buildApiParams = <T>(params?: SearchParams<T>) => {
  return {
    page: params?.page,
    page_size: params?.pageSize,
    search: params?.search,
    ordering: params?.sortColumn
      ? params?.sortDirection === "desc"
        ? `-${String(params.sortColumn)}`
        : String(params.sortColumn)
      : undefined,
    ...(params?.filters || {}),
  };
};