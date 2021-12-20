import { style } from '@vanilla-extract/css';

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75rem',
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
  backgroundColor: '#091e420a',
  fontFamily: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  marginBottom: '0.5rem',
  borderRadius: 3,

  selectors: {
    '&:hover:not(:focus)': {
      backgroundColor: '#091e4214',
    },
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
    marginRight: '0.75rem',

    selectors: {
      '&:hover': {
        backgroundColor: '#026aa7',
      },
      '&[disabled]': {
        color: '#a5adba',
        backgroundColor: '#091e420a',
        cursor: 'not-allowed',
      },
    },
  },
]);

export const closeIcon = style({
  marginRight: 'auto',
  transform: 'scale(1.3)',
  cursor: 'pointer',
});

export const greyButton = style([
  buttonBase,
  {
    backgroundColor: '#091e420a',
    color: '#172b4d',

    selectors: {
      '&:hover': {
        backgroundColor: '#091e4214',
      },
    },
  },
]);

export const markdownContainer = style({
  marginLeft: '2.3rem',
  fontSize: '0.9rem',
});
