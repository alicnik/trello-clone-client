import { useMutation, useQueryClient } from 'react-query';
import { useCustomSession, useBoardContext } from 'hooks';
import { axiosClient } from 'utils/api/client';
import { Board, Card, List, Comment } from 'utils/api/types';

export function useUpdateComment(
  commentId: string,
  cardId: string,
  listId: string
) {
  const boardId = useBoardContext();
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation(
    (updatedComment: { body: string }) => {
      return axiosClient
        .put<Board>(`/cards/comments/${commentId}`, updatedComment, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    },
    {
      onMutate: (updatedComment) => {
        queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
          const containingList = currentBoard.lists.find(
            (l: List) => l.id === listId
          );
          if (!containingList) {
            throw new Error('No containing list');
          }

          const containingCard = containingList.cards.find(
            (c: Card) => c.id === cardId
          );
          if (!containingCard) {
            throw new Error('No containing card');
          }
          if (!containingCard.comments) {
            throw new Error('Containing card has no comments to update');
          }

          const commentToUpdate = containingCard.comments.find(
            (c: Comment) => c.id === commentId
          );
          if (!commentToUpdate) {
            throw new Error('Comment to update not found');
          }

          commentToUpdate.body = updatedComment.body;
          return currentBoard;
        });
      },
      onSuccess: (updatedBoard) => console.log(updatedBoard),
    }
  );
}
