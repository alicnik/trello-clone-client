import { style } from '@vanilla-extract/css';

export const listContainer = style({
  height: '100%',
  backgroundColor: 'lightblue',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '0.5rem 1rem',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});

export const list = style({
  backgroundColor: '#ebecf0',
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxHeight: '100%',
  width: 272,
  padding: '0.4rem',
  minHeight: 100,
});

export const listTitle = style({
  textTransform: 'uppercase',
  color: 'rgb(23, 43, 77)',
  fontSize: '0.8rem',
  fontWeight: 600,
  paddingLeft: '0.5rem',
});

export const card = style({
  backgroundColor: '#fff',
  borderRadius: 3,
  boxShadow: '0 1px 0 #091e4240',
  cursor: 'pointer',
  maxWidth: 300,
  minHeight: 20,
  padding: '0.5rem',
  fontSize: '0.8rem',
  marginBottom: '0.5rem',
});

export const addCard = style({
  border: 'none',
  padding: '0.25rem 0.5rem',
  textAlign: 'left',
  color: '#6b778c',
  fontSize: 14,
});
