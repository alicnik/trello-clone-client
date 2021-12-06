import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100%',
  overflowX: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const innerContainer = style({
  padding: '0.5rem 0',
  height: '100%',
});

export const boardNav = style({
  padding: '0.5rem',
  height: 35,
});
