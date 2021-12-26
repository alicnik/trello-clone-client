import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { Board, User } from 'utils/api';
import { axiosClient } from 'utils/api/client';
import { useCustomSession } from './useCustomSession';

export function useDeleteBoard(boardId: string) {
  const { accessToken, username } = useCustomSession();
  const queryCache = useQueryClient();
  const router = useRouter();

  return useMutation(
    () => {
      return axiosClient
        .delete<User>(`/boards/${boardId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    {
      onMutate: () => {
        queryCache.invalidateQueries(['boards', boardId]);
      },
      onSuccess: () => {
        queryCache.invalidateQueries(['users', username]);
        router.push(`/${username}/boards`);
      },
    }
  );
}
