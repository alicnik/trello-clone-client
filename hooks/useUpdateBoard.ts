import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board } from '../utils/api/types';

export function useUpdateBoard() {
  const queryCache = useQueryClient();
  return useMutation(
    (updatedBoard: Board) =>
      axiosClient
        .put<Board>(`/boards/${updatedBoard.id}`, updatedBoard)
        .then((res) => res.data),
    {
      onMutate: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
      onSuccess: (updatedBoard) => {
        console.log('success');
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
    }
  );
}
