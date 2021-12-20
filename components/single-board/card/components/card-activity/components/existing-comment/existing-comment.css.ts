import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '1.5rem',
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
  fontSize: '0.875rem',
  marginBottom: '0.4rem',
});

export const commentControls = style({
  fontSize: '0.7rem',
  color: '#5e6c84',
  paddingLeft: '0.5rem',
  marginTop: '0.4rem',
});

export const collapsibleBackground = style({
  backgroundColor: '#fff',
  borderRadius: 3,
  width: '100%',
  padding: '0.5rem 0.75rem',
});

export const textArea = style({
  font: 'inherit',
  color: 'inherit',
  resize: 'none',
  border: 'none',
  width: '100%',
  fontSize: '0.9rem',
  lineHeight: '1.4rem',
  outline: 'none',
  background: 'transparent',
});

export const isEmptyMessage = style({
  margin: '0.3rem 0 0.2rem',
  color: '#5e6c84',
  fontSize: '0.875rem',
});

export const controlLink = style({
  textDecoration: 'underline',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: '#172b4d',
    },
  },
});

const open = keyframes({
  from: { height: 0, opacity: 0 },
  to: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
});

const close = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
  to: { height: 0, opacity: 0 },
});

export const collapsibleContent = style({
  marginTop: '0.4rem',

  selectors: {
    '&[data-state="open"]': { animation: `${open} 80ms ease-out` },
    '&[data-state="closed"]': { animation: `${close} 80ms ease-out` },
  },
});
