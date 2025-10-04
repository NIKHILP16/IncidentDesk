// services/BaseService.ts
import type {
  BaseEndpoints,
  CreateMixin,
  DeleteMixin,
  GetMixin,
  ListMixin,
  PaginatedResponse,
  SearchParams,
  UpdateMixin,
} from "../interface/BaseService.type";
import { buildApiParams } from "../utils/buildApiParams";
import axios from "../axios";

export abstract class BaseService<T>
  implements
    CreateMixin<T>,
    GetMixin<T>,
    UpdateMixin<T>,
    DeleteMixin<T>,
    ListMixin<T>
{
  protected endpoints: BaseEndpoints;

  constructor(endpoints: BaseEndpoints) {
    this.endpoints = endpoints;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(params?: SearchParams<T>): Promise<PaginatedResponse<T>> {
    const url =
      typeof this.endpoints.GET_ALL === "function"
        ? this.endpoints.GET_ALL()
        : this.endpoints.BASE;

    const response = await axios.get<PaginatedResponse<T>>(url, {
      params: buildApiParams<T>(params),
    });

    return response.data;
  }

  async getById(id: string): Promise<T> {
    const response = await axios.get<T>(
      this.endpoints.GET_BY_ID
        ? this.endpoints.GET_BY_ID(String(id))
        : `${this.endpoints.BASE}/${id}`
    );
    return response.data;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await axios.put<T>(
      this.endpoints.UPDATE
        ? this.endpoints.UPDATE(String(id))
        : `${this.endpoints.BASE}/${id}`,
      data
    );
    return response.data;
  }


   async partialUpdate(id: string, data: Partial<T>): Promise<T> {
    const response = await axios.patch<T>(
      this.endpoints.UPDATE
        ? this.endpoints.UPDATE(String(id))
        : `${this.endpoints.BASE}/${id}`,
      data
    );
    return response.data;
  }

  async delete(id: string): Promise<T> {
    const response = await axios.delete<T>(
      this.endpoints.DELETE
        ? this.endpoints.DELETE(String(id))
        : `${this.endpoints.BASE}/${id}`
    );
    return response.data;
  }

  async create(data: T): Promise<T> {
    const response = await axios.post<T>(this.endpoints.BASE, data);
    return response.data;
  }
}