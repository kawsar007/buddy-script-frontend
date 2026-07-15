// import type { ApiSuccessResponse, PaginatedResult } from '@/types/api.types';
import { ApiSuccessResponse, PaginatedResult } from '@/src/types/api.types';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from './axios';

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<ApiSuccessResponse<T>>(url, config);
  return response.data.data;
}

/** For endpoints whose success envelope also carries a `meta` pagination block. */
export async function apiGetPaginated<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<PaginatedResult<T>> {
  const response = await apiClient.get<ApiSuccessResponse<T[]>>(url, config);
  return { data: response.data.data, meta: response.data.meta! };
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.post<ApiSuccessResponse<T>>(url, body, config);
  return response.data.data;
}

export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.patch<ApiSuccessResponse<T>>(url, body, config);
  return response.data.data;
}

export async function apiPostForm<T>(url: string, formData: FormData): Promise<T> {
  const response = await apiClient.post<ApiSuccessResponse<T>>(url, formData, {
    headers: { 'Content-Type': undefined },
  });
  return response.data.data;
}

export async function apiPatchForm<T>(url: string, formData: FormData): Promise<T> {
  const response = await apiClient.patch<ApiSuccessResponse<T>>(url, formData, {
    headers: { 'Content-Type': undefined },
  });
  return response.data.data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<ApiSuccessResponse<T>>(url, config);
  return response.data.data;
}
