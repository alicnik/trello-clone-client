import { getSingleBoard } from 'utils/api/boards';
import { Board, List as ListI } from 'utils/api/types';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import * as React from 'react';
import { SingleBoardLayout } from 'components/single-board';
import * as styles from 'styles/single-board.css';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const { data: board, isLoading } = useQuery(
    ['boards', initialState.id],
    () => getSingleBoard(initialState.id),
    { initialData: initialState }
  );

  const handleDragEnd = () => {};

  if (isLoading || !board) {
    return <h2>Loading...</h2>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SingleBoardLayout
        boardName={board.boardName}
        username={board.owner.username}
        background={board.background}
      >
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
          {list.cards.map((card) => (
            <div key={card.id} className={styles.card}>
              {card.title}
            </div>
          ))}
          <button className={styles.addCard}>+ Add a card</button>
        </div>
      )}
    </Draggable>
  );
}
