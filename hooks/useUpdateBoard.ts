import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board } from '../utils/api/types';
import { useCustomSession } from './useCustomSession';

export function useUpdateBoard() {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();
  return useMutation(
    (updatedBoard: Board) =>
      axiosClient
        .put<Board>(`/boards/${updatedBoard.id}`, updatedBoard, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data),
    {
      onMutate: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
    }
  );
}
