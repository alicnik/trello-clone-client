import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board, Card } from '../utils/api/types';

interface MutationArgs {
  boardId: string;
  listId: number;
  newCard: { title: string; board: { id: string } };
}

export function useAddCard() {
  const { data: session } = useSession();
  const queryCache = useQueryClient();
  return useMutation(
    ({ listId, newCard }: MutationArgs) =>
      axiosClient
        .post<Board>(`/lists/${listId}/cards`, newCard, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((res) => res.data),
    {
      onError: (err) => console.error(err),
      onSettled: () => console.log('Settled'),
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
    }
  );
}
