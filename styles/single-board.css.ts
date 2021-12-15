import { style } from '@vanilla-extract/css';

export const outerContainer = style({
  display: 'flex',
  padding: '0.5rem 1rem',
  alignItems: 'flex-start',
  height: '100%',
  backgroundImage:
    'linear-gradient(180deg,#0000003d 0,#0000003d 48px,#0000 80px,#0000)',
  overflow: 'auto',
});

export const listContainer = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});
