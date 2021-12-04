import { style } from '@vanilla-extract/css';

export const aside = style({
  minWidth: 250,
});

export const list = style({
  listStyle: 'none',
});

export const navLink = style({
  padding: '0.5rem',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  color: 'rgb(23, 43, 77)',
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: '0.3rem',
  borderRadius: 3,

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(9, 30, 66, 0.08)',
    },
  },
});
