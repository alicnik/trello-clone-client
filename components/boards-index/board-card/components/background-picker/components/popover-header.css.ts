import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'relative',
  color: '#5e6c84',
  paddingBottom: '1rem',
  borderBottom: '1px solid rgba(9, 30, 66, 0.13)',
  textAlign: 'center',
});

export const title = style({
  display: 'inline',
  fontSize: '0.925rem',
  fontWeight: 400,
});

export const buttonBase = style({
  position: 'absolute',
  top: 0,
  lineHeight: 1.4,
  cursor: 'pointer',
  padding: 2,
  color: '#6b778c',

  selectors: {
    '&:hover': {
      color: '#172b4d',
    },
  },
});

export const closeButton = style([buttonBase, { right: 0 }]);

export const backButton = style([buttonBase, { left: 0 }]);
