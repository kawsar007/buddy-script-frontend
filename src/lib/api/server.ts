import { ApiSuccessResponse } from "@/src/types/api.types";
import { API_BASE_URL } from "./axios";

export async function serverApiGet<T>(
  path: string,
  options?: { revalidate?: number | false },
): Promise<T | null> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  const json = (await response.json()) as ApiSuccessResponse<T>;
  return json.data;
}
