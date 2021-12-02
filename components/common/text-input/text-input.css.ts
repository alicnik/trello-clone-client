import { style } from '@vanilla-extract/css';

export const input = style({
  padding: '0.375rem 0.75rem',
  fontSize: '1.25rem',
  color: '#495057',
  borderRadius: 6,
  lineHeight: 1.5,
  border: '1px solid #ced4da',
  flexGrow: 1,
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;',
  // fontFamily: "'Charlie Text', sans-serif",
  fontFamily: 'inherit',

  ':focus': {
    outline: 'none',
    borderColor: '#80b2ff',
    boxShadow: '0 0 0 0.2rem rgb(0 101 255 / 25%)',
  },
});
