import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Board, Card, List } from 'utils/api';
import { apiClient } from 'utils/api/client';
import { useBoardContext } from './useBoardContext';
import { useCustomSession } from './useCustomSession';

export function useDeleteCard() {
  const boardId = useBoardContext();
  const queryCache = useQueryClient();
  const { accessToken } = useCustomSession();

  return useMutation({
    mutationFn: (cardId: string) => {
      return apiClient
        .delete<Board>(`/lists/cards/${cardId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    onMutate: (cardId) => {
      queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
        const lists = currentBoard.lists.map((list: List) => ({
          ...list,
          cards: list.cards.filter((card: Card) => card.id !== cardId),
        }));
        return { ...currentBoard, lists };
      });
    },
    onSuccess: (updatedBoard) => {
      queryCache.setQueryData(['boards', boardId], updatedBoard);
    },
  });
}
