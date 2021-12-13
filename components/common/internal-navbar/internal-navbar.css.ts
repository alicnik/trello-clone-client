import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  padding: '0.35rem 1rem',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
});

export const blurredHeader = style({
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
});

export const blueHeader = style({
  backgroundColor: '#026AA7',
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
  fontSize: '0.875rem',
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

export const createButton = style({
  backgroundColor: 'rgba(0, 0, 0, 0.24)',
  padding: '0.5rem 0.75rem',

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
    },
  },
});
