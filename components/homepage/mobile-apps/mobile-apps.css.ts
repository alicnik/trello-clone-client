import { style } from '@vanilla-extract/css';

export const backdrop = style({
  backgroundColor: '#FAFBFC',
});

export const container = style({
  maxWidth: 968,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem 0',
});

export const text = style({
  textAlign: 'right',
  flexGrow: 1,
  fontSize: '1.25rem',
  paddingRight: '1rem',
});

export const imageWrapper = style({
  height: 45,
});
