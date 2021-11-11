import { style } from '@vanilla-extract/css';

export const arrowButton = style({
  height: '2.5rem',
  width: '2.5rem',
  marginLeft: '1.4rem',
  fontSize: '1.5rem',
  cursor: 'pointer',
  backgroundColor: 'rgb(255, 255, 255)',
  border: '1px solid rgb(244, 245, 247)',
  outline: 'none',

  selectors: {
    '&:hover': {
      borderColor: 'rgb(223, 225, 230)',
      color: 'rgb(0, 184, 217, 1)',
    },
  },
});
