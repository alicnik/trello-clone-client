import Link from 'next/link';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getUserBoards } from 'utils/api/boards';
import { Board } from 'utils/api/types';

type BoardProps = { boards: Board[] };

export const getServerSideProps: GetServerSideProps<BoardProps> = async (
  context
) => {
  const boards = await getUserBoards(context.params?.username as string);
  return { props: { boards } };
};

const Boards: NextPage<BoardProps> = ({ boards }) => {
  console.log(boards);
  return (
    <>
      {boards.map((board) => (
        <Link key={board.id} href={`/boards/${board.id}`} passHref>
          <div
            style={{
              background: board.background || undefined,
              cursor: 'pointer',
            }}
          >
            <h2>{board.boardName}</h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Boards;
