export interface Board {
  id: string;
  boardName: string;
  description: string | null;
  background: string;
  backgroundThumbnail: string;
  created: Date;
  owner: Pick<User, 'username' | 'emailAddress' | 'id' | 'cardMemberships'>;
  lists: List[];
  cards: Card[];
  starredBy: User[];
}

export interface User {
  id: string;
  username: string;
  emailAddress: string;
  boards: Board[];
  cards: Card[];
  cardMemberships: Card[];
  starredBoards: Board[];
  recentBoards: Board[];
}

export interface List {
  id: string;
  title: string;
  board: Board;
  cards: Card[];
  archived: boolean;
}

export interface Card {
  [key: string]: any;
  id: string;
  title: string;
  description: string | null;
  author: User;
  board: Board;
  boardList: List;
  members: User[];
  labels: Label[];
  comments: Comment[];
  linkedComments: Comment[];
}

export interface Label {
  id: string;
  name: string;
  background: string | null;
  cards: Card[];
}

export interface Comment {
  id: string;
  body: string;
  created: Date;
  author?: User | null;
  parentCard?: Card | null;
  linkedCards?: Card[];
}
