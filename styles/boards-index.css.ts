import { style } from '@vanilla-extract/css';

export const main = style({
  padding: '2rem',
});

export const container = style({
  maxWidth: 1024,
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  margin: '0 auto',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});
export const boards = style({
  flex: 1,
});

export const boardListContainer = style({
  display: 'flex',
  gap: '1rem',
});

export const boardCardContainer = style({
  display: 'flex',
  gap: '1rem',
});

export const personalBoardsIcon = style({
  display: 'inline-block',
  padding: '0.3rem 0.7rem',
  borderRadius: 3,
  color: '#fff',
  backgroundImage: 'linear-gradient(rgb(178, 40, 101), rgb(205, 90, 145))',
  marginRight: '0.3rem',
});

export const boardCard = style({
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: 3,
  height: 100,
  width: 200,
  color: '#fff',
  position: 'relative',

  selectors: {
    '&:hover': {},
  },
});

export const boardCardTitle = style({
  fontSize: '1.15rem',
  zIndex: 1,
  marginBottom: '0.8rem',
});

export const createBoardText = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export const favourite = style({
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
});
