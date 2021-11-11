import { style } from '@vanilla-extract/css';

export const section = style({
  background: '#e6fcff',
  color: '#091e42',
  padding: '5rem 0',
});

export const container = style({
  maxWidth: 960,
  margin: '0 auto',
});

export const navigation = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '1.5rem',
});

export const outerSlider = style({
  overflow: 'hidden',
});

export const innerSlider = style({
  display: 'flex',
  transition: 'transform 0.2s ease',
});

export const dotContainer = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});
