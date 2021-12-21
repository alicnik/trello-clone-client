import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
});

export const heading = style({
  color: 'rgb(23, 43, 77)',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.4rem',
});

export const input = style({
  color: 'rgb(23, 43, 77)',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '0.27rem 0.3rem',
});
