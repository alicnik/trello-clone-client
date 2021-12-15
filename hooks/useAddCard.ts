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
        .post<Card>(`/lists/${listId}/cards`, newCard, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((res) => res.data),
    {
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
      onSuccess: (newCard: Card) => {
        // queryCache.invalidateQueries(['boards', newCard.board.id]);
        queryCache.setQueryData(
          ['boards', newCard.board.id],
          (previousBoard: any) => {
            console.log('previous', previousBoard);
            const newLists = previousBoard.lists.map((currentList: any) => {
              if (currentList.id === newCard.boardList.id) {
                return {
                  ...currentList,
                  cards: currentList.cards.slice(0, -1).concat(newCard),
                };
              }
              return currentList;
            });
            const updatedBoard = { ...previousBoard, lists: newLists };
            return updatedBoard;
          }
        );
      },
    }
  );
}
