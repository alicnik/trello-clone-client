import { getSingleBoard } from 'utils/api/boards';
import { Board } from 'utils/api/types';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import * as React from 'react';
import { SingleBoardLayout } from 'components/single-board';
import * as styles from 'styles/single-board.css';
import { useMutation, useQuery } from 'react-query';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { List } from 'components/single-board';
import axios from 'axios';
import { useUpdateBoard } from 'hooks/useUpdateBoard';
import { useUpdateList } from 'hooks/useUpdateList';
import { getBackground } from 'utils';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SingleBoardProps>> {
  try {
    console.log(context.params);
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
  const { data: board, isLoading } = useQuery(
    ['boards', initialState.id],
    () => getSingleBoard(initialState.id),
    { initialData: initialState }
  );

  const boardMutation = useUpdateBoard();
  const listMutation = useUpdateList(initialState.id);

  // const [board, setBoard] = React.useState(initialState);
  const [windowReady, setWindowReady] = React.useState(false);

  React.useEffect(() => setWindowReady(true), []);

  const handleDragEnd = async (result: DropResult) => {
    if (!board) return;
    const { source, destination, type } = result;

    // Early return if the item has not been dropped in a valid destination
    if (!destination) {
      return;
    }

    // Early return if the item has not moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder lists
    if (type === 'list') {
      const updatedListOrder = [...board.lists];
      const [removed] = updatedListOrder.splice(source.index, 1);
      updatedListOrder.splice(destination.index, 0, removed);
      boardMutation.mutate({ ...board, lists: updatedListOrder });
      return;
    }

    // Reorder cards
    const originListIndex = board.lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const endListIndex = board.lists.findIndex(
      (list) => list.id === destination.droppableId
    );
    const newLists = [...board.lists];

    console.log(originListIndex, endListIndex);

    // Reorder cards in the same list
    if (originListIndex === endListIndex) {
      const newCardOrder = [...board.lists[originListIndex].cards];
      const [removed] = newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, removed);
      newLists[originListIndex].cards = newCardOrder;
      listMutation.mutate({
        originListId: board.lists[originListIndex].id,
        updatedOriginCards: newCardOrder,
      });
      return;
    }

    // Reorder cards when dragged from one list to another
    const updatedOriginCardOrder = [...board.lists[originListIndex].cards];
    const [removed] = updatedOriginCardOrder.splice(source.index, 1);
    newLists[originListIndex].cards = updatedOriginCardOrder;

    const updatedDestinationCardOrder = [...board.lists[endListIndex].cards];
    updatedDestinationCardOrder.splice(destination.index, 0, removed);
    newLists[endListIndex].cards = updatedDestinationCardOrder;

    await listMutation.mutateAsync({
      originListId: board.lists[originListIndex].id,
      updatedOriginCards: updatedOriginCardOrder,
      destinationListId: board.lists[endListIndex].id,
      updatedDestinationCards: updatedDestinationCardOrder,
    });
    listMutation.mutate({
      originListId: board.lists[endListIndex].id,
      updatedOriginCards: updatedDestinationCardOrder,
      destinationListId: board.lists[endListIndex].id,
      updatedDestinationCards: updatedOriginCardOrder,
    });
    return;
  };

  if (isLoading || !board) {
    return <h2>Loading...</h2>;
  }

  console.log(board);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SingleBoardLayout
        boardName={board.boardName}
        username={board.owner.username}
        background={board.background}
      >
        {windowReady ? (
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className={styles.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {board.lists.map((list, index) => (
                  <List key={list.id} list={list} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </SingleBoardLayout>
    </DragDropContext>
  );
};

export default SingleBoard;
