import type { NextPage, GetServerSideProps } from 'next';
import type { User } from 'utils/api/types';
import { getSingleUser } from 'utils/api';
import * as styles from '../../styles/boards-index.css';
import { InternalNavbar } from 'components/common';
import { BoardsSidebar, BoardCardList, BoardCard } from 'components/boards';

type BoardProps = { user: User };

export const getServerSideProps: GetServerSideProps<BoardProps> = async (
  context
) => {
  const user = await getSingleUser(context.params?.username as string);
  return { props: { user } };
};

const Boards: NextPage<BoardProps> = ({ user }) => {
  const hasFavourites = user.boards.some((board) =>
    board.starredBy.some((u) => u.id === user.id)
  );
  console.log(hasFavourites);

  return (
    <>
      <InternalNavbar username={user.username} colour="blue" />
      <main className={styles.main}>
        <div className={styles.container}>
          <BoardsSidebar username={user.username} />
          <section className={styles.boards}>
            {hasFavourites ? (
              <BoardCardList
                boards={user.boards}
                userId={user.id}
                isStarredList={true}
              />
            ) : null}
            <div>
              <h2 className={styles.boardCardTitle}>
                <span className={styles.personalBoardsIcon}>P</span> Personal
                Boards
              </h2>
              <BoardCardList
                boards={user.boards}
                userId={user.id}
                isStarredList={false}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Boards;
