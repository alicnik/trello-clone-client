import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';
import { Board, Card, List } from '../utils/api/types';
import { useCustomSession } from './useCustomSession';

type MutationVariables = {
  originListId: string;
  updatedOriginCards: Card[];
  destinationListId?: string;
  updatedDestinationCards?: Card[];
};

export function useUpdateList(boardId: string) {
  const { accessToken } = useCustomSession();
  const queryCache = useQueryClient();
  return useMutation(
    ({ originListId, updatedOriginCards }: MutationVariables) =>
      axiosClient
        .put<Board>(
          `/boards/${boardId}/lists/${originListId}/cards`,
          updatedOriginCards,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((res) => res.data),
    {
      onMutate: ({
        originListId,
        updatedOriginCards,
        destinationListId,
        updatedDestinationCards,
      }: MutationVariables) => {
        queryCache.setQueryData(['boards', boardId], (previousBoard: any) => {
          const newLists = previousBoard.lists.map((currentList: any) => {
            if (currentList.id === originListId) {
              return { ...currentList, cards: updatedOriginCards };
            }
            // If moving a card from one list to another, optimistically update the UI for both lists
            if (currentList.id === destinationListId) {
              return { ...currentList, cards: updatedDestinationCards };
            }
            return currentList;
          });
          const updatedBoard = { ...previousBoard, lists: newLists };
          return updatedBoard;
        });
      },
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', boardId], updatedBoard);
      },
    }
  );
}
