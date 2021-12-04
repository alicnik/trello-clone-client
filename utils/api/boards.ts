import { axiosClient } from './client';
import { Board } from './types';

export async function getUserBoards(username: string): Promise<Board[]> {
  const res = await axiosClient.get<Board[]>(`/${username}/boards`);
  return res.data;
}

export async function getSingleBoard(boardId: string): Promise<Board> {
  const res = await axiosClient.get<Board>(`/boards/${boardId}`);
  return res.data;
}

export async function createBoard(newBoardDetails: {
  boardName: string;
  background: string;
}) {
  const res = await axiosClient.post<Board>('/boards', newBoardDetails);
  return res.data;
}
