import { style } from '@vanilla-extract/css';

export const hero = style({
  padding: '7rem 0 5rem',
  fontFamily: "'Charlie Text', sans-serif",
  background: 'linear-gradient(0deg, #fff, #eae6ff 100%)',
  color: '#091e42',
});

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 960,
  margin: '0 auto',
});

export const textContainer = style({
  maxWidth: '58.33333%',
  padding: '0 1rem',
});

export const heading = style({
  fontFamily: "'Charlie Display', sans-serif",
  fontSize: '3rem',
  fontWeight: 500,
  lineHeight: 1.25,
  marginBottom: '0.5rem',
});

export const text = style({
  fontSize: '1.25rem',
  lineHeight: 1.5,
  marginBottom: '1.5rem',
});

export const form = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  margin: '3rem 0',
});

export const input = style({
  padding: '0.375rem 0.75rem',
  fontSize: '1.25rem',
  color: '#495057',
  borderRadius: 6,
  lineHeight: 1.5,
  border: '1px solid #ced4da',
  flexGrow: 1,
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;',

  ':focus': {
    outline: 'none',
    borderColor: '#80b2ff',
    boxShadow: '0 0 0 0.2rem rgb(0 101 255 / 25%)',
  },
});

export const imageContainer = style({
  maxWidth: '41.66666667%',
  marginRight: '-5rem',
});
