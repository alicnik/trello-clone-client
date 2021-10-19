import { keyframes, style } from '@vanilla-extract/css';

export const details = style({});

export const summary = style({
  cursor: 'pointer',
  fontSize: '1.5rem',
  lineHeight: 1.33333,
  fontFamily: "'Charlie Display', sans-serif",
  fontWeight: 500,
  listStyle: 'none',
  paddingLeft: '1.25rem',
  position: 'relative',

  ':hover': {
    textDecoration: 'underline',
  },

  '::before': {
    content: '+',
    position: 'absolute',
    left: 0,
  },

  selectors: {
    [`${details}[open] &::before`]: {
      content: '-',
    },
  },
});

export const content = style({
  transition: 'all 5s',
  overflow: 'hidden',

  selectors: {
    [`${details}:not([open]) &`]: {
      height: 0,
      opacity: 0,
      fontSize: '90%',
    },
    [`${details}[open] &`]: {
      height: 'auto',
      opacity: 1,
      fontSize: '100%',
    },
  },
});
