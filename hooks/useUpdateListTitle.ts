import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from 'utils/api/client';
import { Board, List } from 'utils/api/types';
import { useCustomSession } from './useCustomSession';

interface HookArgs {
  boardId: string;
  listId: string;
}

export function useUpdateListTitle({ boardId, listId }: HookArgs) {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation({
    mutationFn: ({ title }: { title: string }) => {
      return apiClient
        .patch<Board>(
          `/boards/lists/${listId}`,
          { title },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )
        .then((res) => res.data);
    },
    onMutate: ({ title }) => {
      queryCache.setQueryData(['boards', boardId], (existingBoard: any) => {
        const updatedLists = existingBoard.lists.map((currentList: List) => {
          return currentList.id === listId
            ? { ...currentList, title }
            : currentList;
        });
        return { ...existingBoard, lists: updatedLists };
      });
    },
    onSuccess: (updatedBoard: Board) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
    },
  });
}
