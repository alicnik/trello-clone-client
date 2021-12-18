import * as React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import axios from 'axios';

import { getSingleBoard } from 'utils/api/boards';
import { Board } from 'utils/api/types';
import { AddListCollapsible, SingleBoardLayout } from 'components/single-board';
import * as styles from 'styles/single-board.css';
import { List } from 'components/single-board';
import { useUpdateBoard, useUpdateList, BoardContextProvider } from 'hooks';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SingleBoardProps>> {
  const session = await getSession(context);
  try {
    const data = await getSingleBoard(
      context.params?.id as string,
      session?.accessToken as string
    );
    return {
      props: {
        initialState: data,
        session,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

interface SingleBoardProps {
  initialState: Board;
  session: Session | null;
}

const SingleBoard: NextPage<SingleBoardProps> = ({ initialState }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: board, isLoading } = useQuery(
    ['boards', initialState.id],
    () => {
      if (!session || status === 'loading') {
        return;
      }
      return getSingleBoard(initialState.id, session?.accessToken as string);
    },
    { initialData: initialState }
  );

  const boardMutation = useUpdateBoard();
  const listMutation = useUpdateList(initialState.id);
  const listContainerRef = React.useRef<HTMLDivElement>(null);
  const isInitialRender = React.useRef(true);

  const [windowReady, setWindowReady] = React.useState(false);

  React.useEffect(() => {
    const { username, id: boardId } = router.query as {
      username: string;
      id: string;
    };
    axios.post(
      `http://localhost:8080/api/v1/${username}/boards/${boardId}`,
      null,
      { headers: { Authorization: `Bearer ${session?.accessToken}` } }
    );
    setWindowReady(true);
  }, [router, session?.accessToken]);

  // console.log(board);

  React.useEffect(() => {
    if (
      isInitialRender.current ||
      board?.lists.length === initialState.lists.length
    ) {
      listContainerRef.current?.scrollTo({ left: 0 });
      isInitialRender.current = false;
      return;
    }

    const scrollToEnd = listContainerRef.current?.scrollWidth ?? 0;
    listContainerRef.current?.scrollTo({
      top: 0,
      left: scrollToEnd + 900,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board?.lists.length, listContainerRef.current]);

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
      (list) => String(list.id) === source.droppableId
    );
    const endListIndex = board.lists.findIndex(
      (list) => String(list.id) === destination.droppableId
    );
    const newLists = [...board.lists];

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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SingleBoardLayout
        boardName={board.boardName}
        username={board.owner.username}
        background={board.background}
      >
        {windowReady ? (
          <BoardContextProvider boardId={board.id}>
            <div className={styles.outerContainer} ref={listContainerRef}>
              <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="list"
              >
                {(provided) => (
                  <div
                    className={styles.listContainer}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {board.lists.map((list, index) => (
                      <List
                        key={list.id}
                        boardId={board.id}
                        list={list}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <AddListCollapsible
                boardId={board.id}
                listContainerRef={listContainerRef}
              />
            </div>
          </BoardContextProvider>
        ) : null}
      </SingleBoardLayout>
    </DragDropContext>
  );
};

export default SingleBoard;
