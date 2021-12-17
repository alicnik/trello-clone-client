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

export const preamble = style({
  fontSize: '0.875rem',
  color: '#172b4d',
  padding: '0.7rem 0',
});
