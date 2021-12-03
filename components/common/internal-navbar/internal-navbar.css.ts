import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  padding: '0.35rem 1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(6px)',
});
export const navbar = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});
export const list = style({
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  alignItems: 'center',
  color: 'white',
});

export const listItem = style({
  cursor: 'pointer',
});

export const logo = style({
  width: 75,
  height: 31,
  backgroundImage: 'url(/images/logos/header-logo-static.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',

  selectors: {
    '&:hover': {
      backgroundImage: 'url(/images/logos/header-logo-loading.gif)',
    },
  },
});

export const rightNav = style({
  display: 'flex',
});
