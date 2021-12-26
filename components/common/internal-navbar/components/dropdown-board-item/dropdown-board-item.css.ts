import { style } from '@vanilla-extract/css';

export const dropdownItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0.5rem 0',
  gap: '0.5rem',
  cursor: 'pointer',
  paddingRight: 4,
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
  transform: 'scale(1.1)',
  marginTop: 3,
});

export const boardThumbnail = style({
  width: 40,
  height: 32,
  borderRadius: 3,
  backgroundSize: 'cover',
});
