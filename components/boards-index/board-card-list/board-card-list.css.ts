import { style } from '@vanilla-extract/css';

export const boardListWrapper = style({
  marginBottom: '3.5rem',
});

export const boardListContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
});

export const boardListTitle = style({
  fontSize: '1.15rem',
  zIndex: 1,
  marginBottom: '0.8rem',
});
