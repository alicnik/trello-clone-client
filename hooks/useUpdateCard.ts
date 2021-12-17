import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board, Card, List } from 'utils/api/types';

interface HookArgs {
  cardId: string;
  boardId: string;
}

type CardUpdate = Partial<Pick<Card, 'title' | 'description'>>;

export function useUpdateCard({ cardId, boardId }: HookArgs) {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  return useMutation(
    (updatedCard: CardUpdate) => {
      return axiosClient
        .patch<Board>(`/lists/cards/${cardId}`, updatedCard, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
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
