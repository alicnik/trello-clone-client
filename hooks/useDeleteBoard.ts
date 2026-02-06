import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board, User } from 'utils/api';
import { apiClient } from 'utils/api/client';
import { useCustomSession } from './useCustomSession';

export function useDeleteBoard(boardId: string) {
  const { accessToken, username } = useCustomSession();
  const queryCache = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return apiClient
        .delete<User>(`/boards/${boardId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {
      queryCache.invalidateQueries({ queryKey: ['boards', boardId] });
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ['users', username] });
      router.push(`/${username}/boards`);
    },
  });
}
