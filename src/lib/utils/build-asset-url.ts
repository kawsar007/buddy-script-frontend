import { API_BASE_URL } from "../api/axios";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v\d+$/, '');

export function buildAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_ORIGIN}${path}`;
}
