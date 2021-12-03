import { style } from '@vanilla-extract/css';

export const list = style({
  backgroundColor: '#ebecf0',
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxHeight: '100%',
  width: 272,
  padding: '0.4rem',
});

export const listTitle = style({
  textTransform: 'uppercase',
  color: 'rgb(23, 43, 77)',
  fontSize: '0.8rem',
  fontWeight: 600,
  paddingLeft: '0.5rem',
});

export const cardsContainer = style({
  flexGrow: 1,
});

export const addCard = style({
  border: 'none',
  padding: '0.4rem 0.5rem',
  borderRadius: 3,
  textAlign: 'left',
  color: '#6b778c',
  fontSize: 14,
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: '#091e4214',
      color: '#172b4d',
    },
  },
});
