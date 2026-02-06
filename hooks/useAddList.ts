import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from 'utils/api/client';
import { useCustomSession } from './useCustomSession';
import { Board } from 'utils/api';

interface MutationArgs {
  boardId: String;
  newList: { title: string };
}

export function useAddList() {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, newList }: MutationArgs) => {
      return apiClient
        .post<Board>(`/boards/${boardId}/lists`, newList, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    onMutate: () => {},
    onSuccess: (updatedBoard) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
    },
  });
}
