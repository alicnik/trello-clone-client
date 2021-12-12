import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board } from '../utils/api/types';

export function useFavouriteBoard() {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  return useMutation(
    (updatedBoard: Board) =>
      axiosClient
        .post<Board>(`/boards/${updatedBoard.id}`, updatedBoard, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((res) => res.data),
    {
      onMutate: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
        queryCache.invalidateQueries(['users', updatedBoard.owner.username]);
      },
    }
  );
}
