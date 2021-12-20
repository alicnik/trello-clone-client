import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '1.5rem',
  width: '100%',
});

export const innerContainer = style({
  width: '100%',
  display: 'flex',
  gap: '1 rem',
});

export const initials = style({
  listStyle: 'none',
  padding: '0.5rem',
  backgroundColor: '#DFE1E6',
  borderRadius: '50%',
  fontSize: '0.725rem',
  fontWeight: 700,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  marginRight: '0.4rem',
  transform: 'translateX(-3px)',
  aspectRatio: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: 34,
});

export const cardAddedInfo = style({
  fontSize: '0.875rem',
  color: '#172b4d',
});

export const dateAdded = style({
  fontSize: '0.75rem',
  color: '#5e6c84',

  selectors: {
    '&:hover': {
      color: '#172b4d',
    },
  },
});
