import Head from 'next/head';

interface SingleBoardLayoutProps {
  boardName: string;
}

export function SingleBoardLayout({
  boardName,
  children,
}: React.PropsWithChildren<SingleBoardLayoutProps>) {
  return (
    <>
      <Head>
        <title>{`${boardName} | Trello`}</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
