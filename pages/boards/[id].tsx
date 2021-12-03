import { getSingleBoard } from 'utils/api/boards';
import { Board } from 'utils/api/types';
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
    const data = await getSingleBoard(context.params?.id as string);
    return {
      props: {
        initialState: data,
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
