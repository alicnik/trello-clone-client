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
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  cursor: 'pointer',
  color: '#fff',

  selectors: {
    '&:hover': {
      backgroundColor: '#ffffff52',
    },
    '&:focus': {
      backgroundColor: '#fff',
      color: '#172b4d',
    },
  },
});

export const starContainer = style({
  position: 'relative',
  cursor: 'pointer',
  padding: '0.4rem',
  boxSizing: 'content-box',
  borderRadius: 3,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  transform: 'scale(1.1)',
  color: '#fff',

  selectors: {
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#f2d600',
    },
  },
});
