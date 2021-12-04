import type { GetServerSideProps, NextPage } from 'next';
import type { User } from 'utils/api/types';
import { getSingleUser } from 'utils/api';

type UserIndexProps = { user: User };

export const getServerSideProps: GetServerSideProps<UserIndexProps> = async (
  context
) => {
  const user = await getSingleUser(context.params?.username as string);
  return { props: { user } };
};

const UserIndexRoute: NextPage<UserIndexProps> = ({ user }) => {
  return null;
};

export default UserIndexRoute;
