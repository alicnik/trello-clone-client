import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '0.5rem 0',
});

export const heading = style({
  fontSize: '0.875rem',
  color: '#5e6c84',
  marginBottom: '0.25rem',
});

export const code = style({
  background: '#f4f5f7',
  borderRadius: 3,
  fontSize: '0.8rem',
  color: '#eb5a46',
  padding: '1px 3px',
  boxShadow: '0 0 0 1px #091e4221',
  lineHeight: '1.25rem',
  fontFamily: `ui-monospace,SF Mono,Segoe UI Mono,Roboto Mono,Ubuntu Mono,Menlo,Courier,monospace`,
});

export const hr = style({
  backgroundColor: '#091e4221',
});
