import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: 968,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
});

export const text = style({
  textAlign: 'right',
  flexGrow: 1,
});
