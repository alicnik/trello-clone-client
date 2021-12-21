import { style } from '@vanilla-extract/css';

export const content = style({
  maxWidth: 300,
  backgroundColor: '#fff',
  boxShadow: '0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214',
  borderRadius: 3,
  lineHeight: '1.25rem',
  padding: '0.65rem',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});

export const heading = style({
  paddingBottom: '0.5rem',
});

export const body = style({
  color: '#172b4d',
  lineHeight: '1.5rem',
  margin: '0.75rem 0 1rem',
  fontSize: '0.9rem',
});

export const button = style({
  border: 'none',
  width: '100%',
  backgroundColor: '#b04632',
  borderRadius: 3,
  color: '#fff',
  padding: '0.5rem 0.75rem',
  fontSize: '0.9rem',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: '#933b27',
    },
  },
});

export const controlLink = style({
  textDecoration: 'underline',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: '#172b4d',
    },
  },
});
