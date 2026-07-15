import { queryKeys } from '@/src/lib/constants/query-keys';
import { PaginatedResult } from '@/src/types/api.types';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import type { Post } from '../types/post.types';

type PostsInfiniteData = InfiniteData<PaginatedResult<Post>>;

export function updatePostInCache(
  queryClient: QueryClient,
  postId: number,
  updater: (post: Post) => Post,
): void {
  queryClient.setQueryData<PostsInfiniteData>(queryKeys.posts.list(), (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        data: page.data.map((post) => (post.id === postId ? updater(post) : post)),
      })),
    };
  });
}

export function removePostFromCache(queryClient: QueryClient, postId: number): void {
  queryClient.setQueryData<PostsInfiniteData>(queryKeys.posts.list(), (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        data: page.data.filter((post) => post.id !== postId),
      })),
    };
  });
}

export function prependPostToCache(queryClient: QueryClient, post: Post): void {
  queryClient.setQueryData<PostsInfiniteData>(queryKeys.posts.list(), (old) => {
    if (!old) return old;
    const [firstPage, ...restPages] = old.pages;
    if (!firstPage) return old;
    return {
      ...old,
      pages: [{ ...firstPage, data: [post, ...firstPage.data] }, ...restPages],
    };
  });
}

export function getPostsSnapshot(
  queryClient: QueryClient,
): PostsInfiniteData | undefined {
  return queryClient.getQueryData<PostsInfiniteData>(queryKeys.posts.list());
}

export function restorePostsSnapshot(
  queryClient: QueryClient,
  snapshot: PostsInfiniteData | undefined,
): void {
  queryClient.setQueryData<PostsInfiniteData>(queryKeys.posts.list(), snapshot);
}
