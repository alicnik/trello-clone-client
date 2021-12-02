import { style } from '@vanilla-extract/css';

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  margin: '4rem 0',
});

export const dropdown = style({
  appearance: 'none',
  padding: '0.5rem',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: '2px solid #EDEFF0',
  color: '#959DA1',
  position: 'relative',
  width: 180,
  backgroundImage: 'url(/images/icons/caret.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center right',
});

export const image = style({
  display: 'block',
});

export const list = style({
  display: 'flex',
  listStyle: 'none',
  gap: '1rem',
  color: '#8993A4',
  textDecoration: 'underline',
});

export const copyright = style({
  color: 'rgb(9, 30, 66)',
  fontSize: '1rem',
});
