import { style } from '@vanilla-extract/css';

export const button = style({
  padding: '0.25rem 0.5rem',
  fontFamily: "'Charlie Text', sans-serif",
  fontSize: '1.09375rem',
  userSelect: 'none',
});

export const buttonNoLink = style({
  border: '1px solid transparent',
  borderRadius: '6px',
  padding: '0.375rem 1.5rem',
  fontSize: '1.25rem',
  borderColor: '#0065ff',
  cursor: 'pointer',
});

export const filled = style({
  borderRadius: '0.2rem',
  color: '#fff',
  transition:
    'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
});

export const blue = style({
  backgroundColor: '#0065ff',

  ':hover': {
    backgroundColor: '#0051cc',
  },
});

export const green = style({
  backgroundColor: 'rgb(54, 179, 126)',
  borderColor: 'rgb(54, 179, 126)',

  ':hover': {
    backgroundColor: 'rgb(0, 135, 90)',
    borderColor: 'rgb(0, 135, 90)',
  },
});

export const outlined = style({
  color: '#0065ff',
  backgroundColor: '#fff',
  border: '1px solid #0065ff',
  userSelect: 'none',
  padding: '0.375rem 0.75rem',
  fontSize: '1.25rem',
  lineHeight: 1.5,
  borderRadius: 6,
  transition:
    'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',

  ':hover': {
    color: '#4c9aff',
    borderColor: '#4c9aff',
    backgroundColor: 'rgba(76, 154, 255, 0.1)',
    textDecoration: 'none',
  },
});

export const link = style({
  color: '#0065ff',
  textDecoration: 'none',
  fontWeight: 400,

  ':hover': {
    color: '#0051cc',
    textDecoration: 'underline',
  },
});

export const regular = style({
  fontWeight: 400,
});

export const medium = style({
  fontWeight: 500,
});
