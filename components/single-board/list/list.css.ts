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
  marginRight: '1rem',
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

export const textarea = style({
  resize: 'vertical',
  color: '#172b4d',
  fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif`,
  lineHeight: '1.25rem',
  boxShadow: '0 1px 0 #091e4240',
  borderRadius: 3,
  padding: '0.5rem',
  display: 'block',
  width: '100%',
  marginBottom: '0.5rem',
});

export const addCardButtonContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const addCardButton = style({
  border: 'none',
  backgroundColor: '#0079bf',
  color: '#fff',
  padding: '0.5rem 0.75rem',
  borderRadius: 3,
  cursor: 'pointer',
  marginRight: '0.75rem',

  selectors: {
    '&:hover': {
      backgroundColor: '#026aa7',
    },
  },
});

export const closeIcon = style({
  cursor: 'pointer',
  transform: 'scale(1.5)',
  color: '#6b778c',
});
