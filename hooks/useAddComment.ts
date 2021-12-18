import { useMutation, useQueryClient } from 'react-query';
import { Board, Card, List } from 'utils/api';
import { axiosClient } from 'utils/api/client';
import { useCustomSession } from './useCustomSession';

export function useAddComment(cardId: string, listId: string, boardId: string) {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation(
    (comment: { body: string }) => {
      return axiosClient
        .post<Board>(`/cards/${cardId}/comments`, comment, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    {
      onMutate: (comment) => {
        queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
          const currentCard = currentBoard.cards.find(
            (c: Card) => c.id === cardId
          );
          if (!currentCard) throw new Error('No current card');
          const newLists = currentBoard.lists.map((currentList: List) => {
            if (currentList.id === listId) {
              const cardToUpdate = currentList.cards.find(
                (c) => c.id === cardId
              );
              cardToUpdate?.comments?.push({
                ...comment,
                id: 'temp',
                created: new Date(),
              });
            }
            return currentList;
          });
          return { ...currentBoard, lists: newLists };
        });
      },
      onSuccess: (updatedBoard: Board) => {
        queryCache.setQueryData(['boards', boardId], updatedBoard);
      },
    }
  );
}
