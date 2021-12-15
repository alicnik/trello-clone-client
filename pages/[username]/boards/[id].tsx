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
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { List } from 'components/single-board';
import axios from 'axios';
import { useUpdateBoard } from 'hooks/useUpdateBoard';
import { useUpdateList } from 'hooks/useUpdateList';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { FiPlus } from 'react-icons/fi';
import { VscChromeClose } from 'react-icons/vsc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useAddList } from 'hooks/useAddList';

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
  const isFirstRender = React.useRef(true);

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

  React.useLayoutEffect(() => {
    if (board?.lists.length === initialState.lists.length) {
      listContainerRef.current?.scrollTo({ left: 0 });
      isFirstRender.current = false;
    }
  });

  React.useEffect(() => {
    if (
      isFirstRender.current ||
      board?.lists.length === initialState.lists.length
    ) {
      console.log('use effect not running');
      return;
    }
    console.log('scrolling to end');
    const scrollToEnd = listContainerRef.current?.scrollWidth ?? 0;
    listContainerRef.current?.scrollTo({
      top: 0,
      left: scrollToEnd + 900,
      behavior: 'smooth',
    });
  }, [board?.lists.length, initialState.lists.length]);

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
        ) : null}
      </SingleBoardLayout>
    </DragDropContext>
  );
};

export default SingleBoard;

interface AddListCollapsibleProps {
  boardId: string;
  listContainerRef: React.RefObject<HTMLDivElement>;
}

export function AddListCollapsible({
  boardId,
  listContainerRef,
}: AddListCollapsibleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addListButtonRef = React.useRef<HTMLDivElement>(null);
  const [isAddingList, setIsAddingList] = React.useState(false);
  const [newList, setNewList] = React.useState({ title: '' });
  const [scrollToEnd, setScrollToEnd] = React.useState(false);
  const mutation = useAddList();

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isAddingList) {
        return;
      }
      const descendants = Array.from(
        addListButtonRef.current?.querySelectorAll('*') || []
      );
      const isInListInputContainer = [
        ...descendants,
        addListButtonRef.current,
      ].some((el) => el === e.target);
      if (isInListInputContainer) {
        return;
      }
      setIsAddingList(false);
    },
    [isAddingList]
  );

  React.useEffect(() => {
    const scrollWidth = listContainerRef.current?.scrollWidth ?? 0;
    listContainerRef.current?.scrollTo({ top: 0, left: scrollWidth + 900 });
    setScrollToEnd(false);
  }, [listContainerRef, scrollToEnd]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [isAddingList]);

  React.useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleAddList = () => {
    mutation.mutate({ boardId, newList });
    setNewList({ title: '' });
    setScrollToEnd(true);
  };

  return (
    <Collapsible.Root
      ref={addListButtonRef}
      className={styles.addListContainer}
      open={isAddingList}
      onOpenChange={setIsAddingList}
    >
      <Collapsible.Trigger asChild>
        {!isAddingList ? (
          <div className={styles.addListButton}>
            <FiPlus className={styles.plusIcon} />
            Add a list
          </div>
        ) : null}
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.collapsibleContent}>
        {isAddingList && (
          <>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="Enter list title..."
              type="text"
              value={newList.title}
              onChange={(e) => setNewList({ title: e.target.value })}
            />
            <div className={styles.addCardButtonContainer}>
              <button
                className={styles.addCardButton}
                disabled={!newList.title}
                onClick={handleAddList}
              >
                Add list
              </button>
              <VscChromeClose
                className={styles.closeIcon}
                onClick={() => setIsAddingList(false)}
              />
            </div>
          </>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
