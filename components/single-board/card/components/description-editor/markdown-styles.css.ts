import { style } from '@vanilla-extract/css';

export const h1 = style({
  marginBottom: '0.75rem',
});

export const h2 = style({
  margin: '0.75rem 0 0.5rem',
});

export const ul = style({
  paddingLeft: '1rem',
});

export const li = style({
  selectors: {
    '&:not(:last-child)': {
      margin: '0.5rem 0',
    },
  },
});

export const p = style({
  lineHeight: '1.25rem',
});

export const a = style({
  textDecoration: 'underline',
});
