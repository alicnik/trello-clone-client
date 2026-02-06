import { useBoardContext, useCustomSession } from 'hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board, Card, List, Comment } from 'utils/api/types';
import { apiClient } from 'utils/api/client';

export function useDeleteComment(cardId: string, listId: string) {
  const queryCache = useQueryClient();
  const boardId = useBoardContext();
  const { accessToken } = useCustomSession();

  return useMutation({
    mutationFn: (commentId: string) => {
      return apiClient
        .delete<Board>(`/cards/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    onMutate: (commentId) => {
      queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
        const parentList = currentBoard.lists.find(
          (l: List) => l.id === listId,
        );
        if (!parentList) throw new Error('List not found');

        const parentCard = parentList.cards.find((c: Card) => c.id === cardId);
        if (!parentCard) throw new Error('Card not found');

        parentCard.comments =
          parentCard.comments?.filter((c: Comment) => c.id !== commentId) ?? [];

        return currentBoard;
      });
    },
    onSuccess: (updatedBoard) => {
      queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
    },
  });
}
