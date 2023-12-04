import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { apiClient } from 'utils/api/client';
import { Board, Card, List } from 'utils/api/types';
import { useCustomSession } from './useCustomSession';

interface HookArgs {
  cardId: string;
  boardId: string;
}

type CardUpdate = Partial<Pick<Card, 'title' | 'description'>>;

export function useUpdateCard({ cardId, boardId }: HookArgs) {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();

  return useMutation(
    (updatedCard: CardUpdate) => {
      return apiClient
        .patch<Board>(`/lists/cards/${cardId}`, updatedCard, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data);
    },
    {
      onMutate: (updatedCard) => {
        queryCache.setQueryData(['boards', boardId], (currentBoard: any) => {
          const list = currentBoard.lists.find((list: List) => {
            return list.cards.some((card) => card.id === cardId);
          });
          const newLists = currentBoard.lists.map((currentList: List) => {
            if (currentList.id === list.id) {
              const newCards = currentList.cards.map((card) => {
                if (card.id === cardId) {
                  Object.entries(updatedCard).forEach(([key, value]) => {
                    card[key] = value;
                  });
                }
                return card;
              });
              return { ...currentList, cards: newCards };
            }
            return currentList;
          });
          return { ...currentBoard, lists: newLists };
        });
      },
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', boardId], updatedBoard);
      },
    }
  );
}
