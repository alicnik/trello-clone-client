import { axiosClient } from './client';
// import { getToken } from './lib';
import { Board } from './types';

export async function getUserBoards(
  username: string,
  token: string
): Promise<Board[]> {
  const res = await axiosClient.get<Board[]>(`/${username}/boards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getSingleBoard(
  boardId: string,
  token: string
): Promise<Board> {
  const res = await axiosClient.get<Board>(`/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function createBoard(
  newBoardDetails: {
    boardName: string;
    background: string;
    backgroundThumbnail: string;
  },
  token: string
) {
  const res = await axiosClient.post<Board>('/boards', newBoardDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
