import { style } from '@vanilla-extract/css';

export const trigger = style({
  margin: '0 0.25rem 0 auto',
  color: '#6b778c',
  cursor: 'pointer',
  lineHeight: 0,
  padding: '0.4rem',
  borderRadius: 3,

  selectors: {
    '&:hover': {
      color: '#172b4d',
      backgroundColor: '#091e4214',
    },
  },
});

export const content = style({
  width: 300,
  background: '#fff',
  borderRadius: 3,
  boxShadow: '0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214',
  paddingTop: '0.75rem',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});

export const container = style({
  padding: '0.5rem 0',
  color: '#172b4d',
  fontSize: '0.875rem',
});

export const option = style({
  padding: '0.425rem 0.75rem',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: '#091e420a',
    },
  },
});
