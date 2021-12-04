import { style } from '@vanilla-extract/css';

export const star = style({
  transition: 'transform 0.15s ease',

  selectors: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
});

export const favouriteStar = style({
  color: 'gold',
});
