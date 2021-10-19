import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '3rem 0',
  gap: '2rem',
});

export const textContainer = style({
  maxWidth: '58.33333%',
  flex: '0 0 58.33333333%',
});

export const heading = style({
  fontSize: '2.25rem',
  lineHeight: 1.333333,
  marginBottom: '0.5rem',
});

export const subHeading = style({
  fontSize: '1rem',
  lineHeight: 1.25,
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  fontFamily: "'Charlie Display', sans-serif",
  fontWeight: 500,
  padding: '0 1rem',
});

export const imageAtEnd = style({
  order: -1,
});

export const summaryText = style({
  marginBottom: '1.5rem',
  lineHeight: 1.5,
  fontSize: '1.25rem',
});

export const greyText = style({
  color: '#7a869a',
});

export const details = style({
  cursor: 'pointer',
  textDecoration: 'underline',
});
