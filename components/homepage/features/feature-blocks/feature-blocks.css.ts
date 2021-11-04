import { style } from '@vanilla-extract/css';

export const subHeading = style({
  fontSize: '1rem',
  lineHeight: 1.25,
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  fontFamily: "'Charlie Display', sans-serif",
  fontWeight: 500,
});

export const learnMoreSummary = style({
  marginBottom: '1.5rem',
});

export const learnMoreList = style({
  marginBottom: '1rem',
  paddingLeft: '2rem',
});
