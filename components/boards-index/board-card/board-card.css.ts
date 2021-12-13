import { style } from '@vanilla-extract/css';

export const boardCard = style({
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: 3,
  height: 100,
  width: 200,
  color: '#fff',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 1,

  selectors: {
    '&:hover::after': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))',
    },
  },
});

export const boardCardTitle = style({
  fontSize: '1.15rem',
  zIndex: 10,
  marginBottom: '0.8rem',
  position: 'absolute',
  top: '0.5rem',
  left: '0.75rem',
});

export const createBoardCard = style({
  backgroundColor: '#091e420a',
  color: '#172b4d',
  fontWeight: 400,
  fontSize: 14,
});

export const createBoardText = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  textAlign: 'center',
});

export const favourite = style({
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  zIndex: 10,
});

// POPOVER
