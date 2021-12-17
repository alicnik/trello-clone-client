import { style } from '@vanilla-extract/css';

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  height: 34,
});

export const icon = style({
  marginRight: '1.25rem',
  transform: 'scale(1.2) translateX(2px)',
});

export const heading = style({
  fontSize: '1rem',
  lineHeight: '1.25rem',
  fontWeight: 600,
  color: 'rgb(23, 43, 77)',
  marginRight: '0.5rem',
});

export const textArea = style({
  resize: 'none',
  marginLeft: '2.4rem',
  width: '80%',
  border: 'none',
  padding: '0.5rem',
  background: 'transparent',
  fontFamily: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  marginBottom: '0.5rem',

  selectors: {
    '&:focus': {
      border: 'inset 0 0 0 2px #0079bf',
      cursor: 'text',
    },
  },
});

const buttonBase = style({
  border: 'none',
  borderRadius: 3,
  padding: '0.425rem 0.75rem',
  cursor: 'pointer',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
});

export const controlsContainer = style({
  marginLeft: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  width: '80%',
});

export const saveButton = style([
  buttonBase,
  {
    backgroundColor: '#0079bf',
    color: '#fff',

    selectors: {
      '&:hover': {
        backgroundColor: '#026aa7',
      },
    },
  },
]);

export const closeIcon = style({
  marginRight: 'auto',
});

export const greyButton = style([
  buttonBase,
  {
    backgroundColor: '#091e420a',

    selectors: {
      '&:hover': {
        backgroundColor: '#091e4214',
      },
    },
  },
]);
