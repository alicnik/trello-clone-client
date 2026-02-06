import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from 'utils/api/client';
import { Board, Card } from '../utils/api/types';
import { useCustomSession } from './useCustomSession';

interface MutationArgs {
  boardId: string;
  listId: string;
  newCard: { title: string; board: { id: string } };
}

export function useAddCard() {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();
  return useMutation({
    mutationFn: ({ listId, newCard }: MutationArgs) =>
      apiClient
        .post<Board>(`/lists/${listId}/cards`, newCard, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data),
    onError: (err) => console.error(err),
    onMutate: ({ boardId, listId, newCard }) => {
      queryCache.setQueryData(['boards', boardId], (previousBoard: any) => {
        const newLists = previousBoard.lists.map((currentList: any) => {
          if (currentList.id === listId) {
            return {
              ...currentList,
              cards: currentList.cards.concat({ ...newCard, id: 'temp' }),
            };
          }
          return currentList;
        });
        const updatedBoard = { ...previousBoard, lists: newLists };
        return updatedBoard;
      });
    },
    onSuccess: (updatedBoard: Board) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
    },
  });
}
