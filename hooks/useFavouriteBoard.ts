import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from 'utils/api/client';
import { Board } from '../utils/api/types';
import { useCustomSession } from './useCustomSession';

export function useFavouriteBoard() {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: (updatedBoard: Board) =>
      apiClient
        .post<Board>(`/boards/${updatedBoard.id}`, updatedBoard, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data),
    onMutate: (updatedBoard) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
    },
    onSuccess: (updatedBoard) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      queryCache.invalidateQueries({
        queryKey: ['users', updatedBoard.owner.username],
      });
    },
  });
}
