import { getSingleBoard } from 'api/boards';
import { Board } from 'api/types';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import * as React from 'react';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SingleBoardProps>> {
  try {
    const res = await getSingleBoard(context.params?.id as string);
    return {
      props: {
        initialState: res.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}

interface SingleBoardProps {
  initialState: Board;
}

const SingleBoard: NextPage<SingleBoardProps> = ({ initialState }) => {
  const [board, setBoard] = React.useState<Board>(initialState);
  return <div>{board.boardName}</div>;
};

export default SingleBoard;
