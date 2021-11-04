import { keyframes, style } from '@vanilla-extract/css';

export const details = style({
  selectors: {
    [`&:not([open])`]: {
      maxHeight: 31,
      transition: 'max-height 0.2s ease',
    },
    [`&[open]`]: {
      maxHeight: 300,
      transition: 'max-height 0.5s ease',
    },
  },
});

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

const slideDown = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(1rem)',
  },
});

export const content = style({
  selectors: {
    [`${details}[open] &`]: {
      animation: `${slideDown} 0.3s both ease 0.1s`,
    },
  },
});
