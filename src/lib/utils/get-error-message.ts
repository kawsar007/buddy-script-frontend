import { ApiError } from "@/src/types/api.types";

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const apiError = error as ApiError;
    if (apiError.errors?.length) {
      return apiError.errors.join(' ');
    }
    if (typeof apiError.message === 'string') {
      return apiError.message;
    }
  }
  return 'Something went wrong. Please try again.';
}
