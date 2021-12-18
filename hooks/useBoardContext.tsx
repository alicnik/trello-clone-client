import * as React from 'react';

const BoardContext = React.createContext<string | null>(null);

export function BoardContextProvider({
  boardId,
  children,
}: React.PropsWithChildren<{ boardId: string }>) {
  return (
    <BoardContext.Provider value={boardId}>{children}</BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = React.useContext(BoardContext);
  if (!context) throw new Error('Missing BoardContextProvider');
  return context;
}
