import type { NextPage, GetServerSideProps } from 'next';
import type { User } from 'utils/api/types';
import { getSingleUser } from 'utils/api';
import * as styles from '../../styles/boards-index.css';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { InternalNavbar } from 'components/common';
import { BoardsSidebar, BoardCardList } from 'components/boards-index';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import { useCustomSession } from 'hooks';

type BoardProps = { initialData: User };

export const getServerSideProps: GetServerSideProps<BoardProps> = async (
  context
) => {
  const username = context.params?.username as string;
  const session = await getSession(context);

  try {
    const initialData = await getSingleUser(
      username,
      session?.accessToken as string
    );
    return { props: { initialData, session } };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

const Boards: NextPage<BoardProps> = ({ initialData }) => {
  const { status, accessToken } = useCustomSession();
  const { data: user } = useQuery(
    ['users', initialData.username],
    () => {
      if (status === 'loading' || !accessToken) return;
      return getSingleUser(initialData.username, accessToken as string);
    },
    { initialData }
  );

  if (!user || !user?.boards) {
    return <h2>Loading...</h2>;
  }

  const hasFavourites = user.boards.some((board) =>
    board.starredBy.some((u) => u.id === user.id)
  );

  const hasRecentlyViewed = user.recentBoards.length > 0;

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Boards | Trello</title>
      </Head>
      <InternalNavbar username={user.username} colour="blue" />
      <main className={styles.main}>
        <div className={styles.container}>
          <BoardsSidebar username={user.username} />
          <section className={styles.boards}>
            {hasFavourites ? (
              <BoardCardList
                boards={user.boards.slice(0, 4)}
                userId={user.id}
                isStarredList={true}
              />
            ) : null}
            {hasRecentlyViewed ? (
              <div style={{ marginBottom: '4rem' }}>
                <h2 className={styles.boardCardTitle}>
                  <AiOutlineClockCircle /> Recently viewed
                </h2>
                <BoardCardList
                  boards={user.recentBoards}
                  userId={user.id}
                  showCreateCard={false}
                />
              </div>
            ) : null}
            <div>
              <h2 className={styles.boardCardTitle}>
                <span className={styles.personalBoardsIcon}>P</span> Personal
                Boards
              </h2>
              <BoardCardList boards={user.boards} userId={user.id} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Boards;
