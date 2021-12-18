import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '2rem',
  width: '100%',
});

export const innerContainer = style({
  width: '100%',
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

export const metaInfoContainer = style({
  marginBottom: '0.4rem',
});

export const fullName = style({
  color: '#172b4d',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: 700,
  marginRight: '0.5rem',
});

export const creationDate = style({
  color: '#5e6c84',
  fontSize: '0.75rem',
});

export const commentBody = style({
  width: '100%',
  background: '#fff',
  padding: '0.5rem 0.75rem',
  boxShadow: '0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214',
  borderRadius: 3,
});
