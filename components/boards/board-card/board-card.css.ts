import { style } from '@vanilla-extract/css';

export const boardCard = style({
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: 3,
  height: 100,
  width: 200,
  color: '#fff',
  position: 'relative',

  selectors: {
    '&:hover': {},
  },
});

export const boardCardTitle = style({
  fontSize: '1.15rem',
  zIndex: 1,
  marginBottom: '0.8rem',
});

export const createBoardText = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export const favourite = style({
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
});
