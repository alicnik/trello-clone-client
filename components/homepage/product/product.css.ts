import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '5rem 0',
  maxWidth: 960,
  margin: '0 auto',
  color: '#091e42',
});

export const heading = style({
  maxWidth: '70%',
  fontFamily: "'Charlie Display', sans-serif",
  fontWeight: 500,
  marginBottom: '0.5rem',
  lineHeight: 1.33333,
  fontSize: '2.25rem',
});

export const text = style({
  maxWidth: '80%',
  marginBottom: '1.5rem',
  lineHeight: 1.5,
  fontSize: '1.25rem',
});

export const button = style({
  marginBottom: '1.5rem',
});

export const usedByText = style({
  margin: '1rem 0 1.5rem',
  lineHeight: 1.5,
  fontSize: '1.25rem',
});

export const logos = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2.3rem',
});
