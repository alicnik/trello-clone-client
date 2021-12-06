import { style } from '@vanilla-extract/css';

export const ellipsisIcon = style({
  position: 'relative',
  top: 2,
  left: 0.5,
  transform: 'scale(1.2)',
});

export const content = style({
  width: 300,
  background: 'white',
  borderRadius: 3,
  padding: '1rem',
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif`,
});

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

export const closeButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
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

export const gridHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0 0.25rem',
});

export const gridHeaderTitle = style({
  color: '#172b4d',
  fontWeight: 600,
  fontSize: '0.9rem',
  lineHeight: 2.2,
});

export const seeMoreButton = style({
  background: 'none',
  textDecoration: 'underline',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  color: '#5e6c84',
  padding: '0.5rem 0.75rem',
  borderRadius: 3,

  selectors: {
    '&:hover': {
      color: '#172b4d',
      backgroundColor: 'rgba(9, 30, 66, 0.08)',
    },
  },
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.5rem',
  width: '100%',
});

export const backgroundThumbnailLarge = style({
  height: 56,
  width: '100%',
  borderRadius: 3,
});

export const artist = style({
  padding: '2px 3px',
  zIndex: 2,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  fontSize: '0.75rem',
  textDecoration: 'underline',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  selectors: {
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
});

export const artistWhenMouseOverParent = style({
  color: '#DFE1E6',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});
