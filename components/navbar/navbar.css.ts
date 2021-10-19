import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 1030,
  transition: 'background 1s ease 0s',
});

export const overlay = style({
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgb(0 0 0 / 30%)',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  gap: '0.35rem',
});

export const logo = style({
  flexGrow: 1,
});
