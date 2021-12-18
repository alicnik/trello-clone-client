import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { Board, Card, List } from 'utils/api';
import { axiosClient } from 'utils/api/client';

export function useAddComment(cardId: string, listId: string, boardId: string) {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  return useMutation(
    (comment: { body: string }) => {
      console.log('mutating');
      return axiosClient
        .post<Board>(`/cards/${cardId}/comments`, comment, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((res) => res.data);
    },
    {
      onMutate: (comment) => {
        console.log('onMutate');
        queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
          const currentCard = currentBoard.cards.find(
            (c: Card) => c.id === cardId
          );
          if (!currentCard) throw new Error('No current card');
          console.log('currentCard', currentCard);
          const newLists = currentBoard.lists.map((currentList: List) => {
            if (currentList.id === listId) {
              const cardToUpdate = currentList.cards.find(
                (c) => c.id === cardId
              );
              cardToUpdate?.comments.push({
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
