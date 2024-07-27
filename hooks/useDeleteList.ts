import { useMutation, useQueryClient } from 'react-query';
import { apiClient } from 'utils/api/client';
import { Board, List } from 'utils/api/types';
import { useBoardContext } from './useBoardContext';
import { useCustomSession } from './useCustomSession';

export function useDeleteList() {
  const boardId = useBoardContext();
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();
  return useMutation(
    (listId: string) => {
      return apiClient
        .delete<Board>(`/lists/${listId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data);
    },
    {
      onMutate: (listId: string) => {
        queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
          const newLists = currentBoard.lists.filter(
            (l: List) => l.id !== listId
          );
          return { ...currentBoard, lists: newLists };
        });
      },
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', boardId], updatedBoard);
      },
    }
  );
}
