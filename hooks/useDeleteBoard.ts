import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { Board, User } from 'utils/api';
import { axiosClient } from 'utils/api/client';
import { useCustomSession } from './useCustomSession';

export function useDeleteBoard() {
  const { accessToken, username } = useCustomSession();
  const queryCache = useQueryClient();
  const router = useRouter();

  return useMutation(
    (boardId: string) => {
      return axiosClient
        .delete<User>(`/boards/${boardId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        router.push(`/${username}/boards`);
      },
    }
  );
}
