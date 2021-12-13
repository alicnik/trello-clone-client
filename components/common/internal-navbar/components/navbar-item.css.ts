import { style } from '@vanilla-extract/css';

export const content = style({
  background: 'white',
  padding: '0.5rem 0.75rem',
  borderRadius: 3,
  width: 300,
  boxShadow: '0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%)',
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif`,
});

export const listItem = style({
  cursor: 'pointer',
  fontSize: '0.875rem',
  padding: '0.5rem',
  borderRadius: 3,

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
});

export const labelContainer = style({
  position: 'relative',
  color: '#5e6c84',
  paddingBottom: '0.7rem',
  borderBottom: '1px solid rgba(9, 30, 66, 0.13)',
  textAlign: 'center',
  marginBottom: '0.75rem',
});

export const label = style({
  display: 'inline',
  fontSize: '0.875rem',
  fontWeight: 400,
});

export const buttonBase = style({
  position: 'absolute',
  top: 0,
  lineHeight: 1.4,
  cursor: 'pointer',
  padding: 2,
  color: '#6b778c',
  transform: 'scale(0.9)',

  selectors: {
    '&:hover': {
      color: '#172b4d',
    },
  },
});

export const boardThumbnail = style({
  width: 40,
  height: 32,
  borderRadius: 3,
  backgroundSize: 'cover',
});

export const closeButton = style([buttonBase, { right: 0 }]);

export const dropdownItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0.5rem 0',
  gap: '0.5rem',
  cursor: 'pointer',
});

export const boardName = style({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#091e42',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

export const favourite = style({
  transform: 'scale(1.2)',
  marginTop: 3,
});

export const downChevron = style({
  marginLeft: 5,
  transform: 'scale(1.2) translateY(2px)',
});
