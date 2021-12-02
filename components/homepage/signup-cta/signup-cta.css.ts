import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '3rem 1rem',
});

export const container = style({
  maxWidth: 960,
  margin: '0 auto',
  padding: '1.5rem 4rem',
  color: '#fff',
  borderRadius: '0.5rem',
  background:
    'linear-gradient(0deg, rgb(64, 50, 148), rgb(76, 154, 255)) no-repeat',
});

export const text = style({
  fontSize: '1.5rem',
  textAlign: 'center',
  lineHeight: 1.75,
  marginBottom: '3rem',
});

export const form = style({
  margin: '0 auto',
  display: 'flex',
  gap: '1rem',
  maxWidth: 530,
});
