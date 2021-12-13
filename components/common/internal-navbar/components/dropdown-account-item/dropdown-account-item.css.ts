import { style } from '@vanilla-extract/css';

export const container = style({
  color: '#172b4d',
  fontSize: '0.874rem',
});

export const logOut = style({
  cursor: 'pointer',
  padding: '0.5rem',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(9, 30, 66, 0.04)',
    },
  },
});
