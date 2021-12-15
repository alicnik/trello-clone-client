import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from 'utils/api/client';

interface MutationArgs {
  boardId: String;
  newList: { title: string };
}

export function useAddList() {
  const { data: session } = useSession();
  const queryCache = useQueryClient();

  return useMutation(
    ({ boardId, newList }: MutationArgs) => {
      return axiosClient
        .post(`/boards/${boardId}/lists`, newList, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((res) => res.data);
    },
    {
      onMutate: () => {},
      onSuccess: (updatedBoard) => {
        queryCache.setQueryData(['boards', updatedBoard.id], updatedBoard);
      },
    }
  );
}
