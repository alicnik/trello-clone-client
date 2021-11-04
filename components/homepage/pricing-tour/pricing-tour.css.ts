import { style } from '@vanilla-extract/css';

export const section = style({
  paddingTop: '1rem',
  paddingBottom: '5rem',
});

export const container = style({
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 960,
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: '#e1e4e8',
  padding: '2rem 0',
  position: 'relative',
});

export const itemContainer = style({
  display: 'flex',
  flex: 1,
});

export const imageContainer = style({
  padding: '1rem',
});

export const heading = style({
  fontSize: '1.5rem',
  lineHeight: 1.33333,
  fontWeight: 500,
  marginBottom: '0.5rem',
});

export const textContainer = style({
  padding: '1rem',
});

export const text = style({
  fontSize: '1.25rem',
  marginBottom: '1.5rem',
});

export const button = style({
  fontSize: '1rem',
});
