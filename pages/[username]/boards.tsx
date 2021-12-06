import type { NextPage, GetServerSideProps } from 'next';
import type { User } from 'utils/api/types';
import { getSingleUser } from 'utils/api';
import * as styles from '../../styles/boards-index.css';
import { InternalNavbar } from 'components/common';
import { BoardsSidebar, BoardCardList } from 'components/boards-index';
import { useQuery } from 'react-query';

type BoardProps = { initialData: User };

export const getServerSideProps: GetServerSideProps<BoardProps> = async (
  context
) => {
  try {
    const initialData = await getSingleUser(context.params?.username as string);
    return { props: { initialData } };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const Boards: NextPage<BoardProps> = ({ initialData }) => {
  // console.log(initialData);
  const { data: user } = useQuery(
    ['users', initialData.id],
    () => getSingleUser(initialData.username),
    { initialData }
  );

  console.log(user);
  if (!user) {
    return <h2>Loading...</h2>;
  }
  const hasFavourites = user.boards.some((board) =>
    board.starredBy.some((u) => u.id === user.id)
  );

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
