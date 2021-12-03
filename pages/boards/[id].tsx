import { getSingleBoard } from 'utils/api/boards';
import { Board, List as ListI, Card as CardI } from 'utils/api/types';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import * as React from 'react';
import { SingleBoardLayout } from 'components/single-board';
import * as styles from 'styles/single-board.css';
import { useQuery } from 'react-query';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

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
  // const { data: board, isLoading } = useQuery(
  //   ['boards', initialState.id],
  //   () => getSingleBoard(initialState.id),
  //   { initialData: initialState }
  // );

  const [board, setBoard] = React.useState(initialState);
  const [windowReady, setWindowReady] = React.useState(false);

  React.useEffect(() => setWindowReady(true), []);

  const handleDragEnd = (result: DropResult) => {
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
      setBoard({ ...board, lists: updatedListOrder });
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
      setBoard({ ...board, lists: newLists });
      return;
    }

    // Reorder cards when dragged from one list to another
    const updatedOriginCardOrder = [...board.lists[originListIndex].cards];
    const [removed] = updatedOriginCardOrder.splice(source.index, 1);
    newLists[originListIndex].cards = updatedOriginCardOrder;

    const updatedDestinationCardOrder = [...board.lists[endListIndex].cards];
    updatedDestinationCardOrder.splice(destination.index, 0, removed);
    newLists[endListIndex].cards = updatedDestinationCardOrder;

    setBoard({ ...board, lists: newLists });
    return;
  };

  // if (isLoading || !board) {
  //   return <h2>Loading...</h2>;
  // }

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

interface ListProps {
  list: ListI;
  index: number;
}

function List({ list, index }: ListProps) {
  return (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className={styles.list}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h2 className={styles.listTitle} {...provided.dragHandleProps}>
            {list.title}
          </h2>
          <Droppable droppableId={list.id} type="task">
            {(provided) => (
              <div
                style={{ flexGrow: 1 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button className={styles.addCard}>+ Add a card</button>
        </div>
      )}
    </Draggable>
  );
}

interface CardProps {
  card: CardI;
  index: number;
}

function Card({ card, index }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}
