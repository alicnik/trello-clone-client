import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board, List } from 'utils/api/types';

interface HookArgs {
  boardId: string;
  listId: string;
}

export function useUpdateListTitle({ boardId, listId }: HookArgs) {
  const queryCache = useQueryClient();
  const { data: session } = useSession();

  return useMutation(
    ({ title }: { title: string }) => {
      return axiosClient
        .patch<Board>(
          `/boards/lists/${listId}`,
          { title },
          { headers: { Authorization: `Bearer ${session?.accessToken}` } }
        )
        .then((res) => res.data);
    },
    {
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
    }
  );
}
