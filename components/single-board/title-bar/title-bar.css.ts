import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '0.5rem 1rem 0',
  backgroundColor: '#0000003d',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const input = style({
  border: 'none',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: '1.175rem',
  lineHeight: '2rem',
  padding: '0 0.5rem',
  borderRadius: 3,
  width: 114,
  backgroundColor: 'transparent',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: '#ffffff52',
    },
    '&:focus': {
      backgroundColor: '#fff',
    },
  },
});

export const starContainer = style({
  position: 'relative',
  cursor: 'pointer',
  padding: '0.4rem',
  boxSizing: 'content-box',
  borderRadius: 3,
  backgroundColor: '#00000014',

  selectors: {
    '&:hover': {
      color: '#f2d600',
    },
  },
});
