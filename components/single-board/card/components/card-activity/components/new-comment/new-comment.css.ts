import { keyframes, style } from '@vanilla-extract/css';

export const commentContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '2rem',
});

export const icon = style({
  marginRight: '1.25rem',
  transform: 'scale(1.4) translateX(2px)',
});

export const headingMargin = style({
  marginRight: 'auto',
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
});

export const textAreaContainer = style({
  flex: 1,
  boxShadow: '0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214',
  borderRadius: 3,
  transition: 'box-shadow 85ms ease, padding-bottom 85ms ease',
  background: '#fff',
  overflow: 'hidden',
  position: 'relative',

  selectors: {
    '&:hover:not(:focus-within)': {
      boxShadow: '0 1px 1px #091e4240, 0 0 0 1px #091e4214',
    },
    '&:focus-within': {
      boxShadow: '0 4px 8px -2px #091e4240, 0 0 0 1px #091e4214',
    },
  },
});

export const textArea = style({
  width: '100%',
  border: 'none',
  resize: 'none',
  outline: 'none',
  fontFamily: 'inherit',
  lineHeight: '1.5rem',
  color: 'inherit',
  padding: '0.5rem 0.75rem 0.4rem',
});

const open = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
});

const close = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
});

export const contentStyles = style({
  padding: '0 0 0.75rem 0.75rem',

  selectors: {
    '&[data-state="open"]': { animation: `${open} 60ms ease-out` },
    '&[data-state="closed"]': {
      paddingTop: '1.5rem',
      animation: `${close} 10ms ease-out`,
    },
  },
});
