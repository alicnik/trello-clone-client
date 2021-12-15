import { keyframes, style } from '@vanilla-extract/css';

export const outerContainer = style({
  display: 'flex',
  padding: '0.5rem 1rem',
  alignItems: 'flex-start',
  height: '100%',
  backgroundImage:
    'linear-gradient(180deg,#0000003d 0,#0000003d 48px,#0000 80px,#0000)',
  overflow: 'auto',
});

export const listContainer = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '1rem',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
  marginRight: '1rem',
});

export const addListContainer = style({
  width: 272,
  backgroundColor: '#ffffff3d',
  flexShrink: 0,
  borderRadius: 3,
  color: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
  fontSize: '0.875rem',

  selectors: {
    '&:hover': {
      backgroundColor: '#ffffff52',
    },
  },
});

export const addListButton = style({
  cursor: 'pointer',
  display: 'flex',
  padding: '0.65rem 0.8rem',
  alignItems: 'center',
  gap: '0.25rem',
  height: 'max-content',
  border: 'none',
});

export const plusIcon = style({
  transform: 'scale(1.3)',
});

export const addCardButtonContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const addCardButton = style({
  border: 'none',
  backgroundColor: '#0079bf',
  color: '#fff',
  padding: '0.5rem 0.75rem',
  borderRadius: 3,
  cursor: 'pointer',
  marginRight: '0.75rem',

  selectors: {
    '&:hover': {
      backgroundColor: '#026aa7',
    },
  },
});

export const closeIcon = style({
  cursor: 'pointer',
  transform: 'scale(1.5)',
  color: '#6b778c',
  zIndex: 1,
});

const open = keyframes({
  from: { height: 0, opacity: 0 },
  to: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
});

const close = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
});

export const collapsibleContent = style({
  overflow: 'hidden',
  padding: '0.65rem 0.8rem',

  selectors: {
    '&[data-state="open"]': { animation: `${open} 50ms ease-out` },
    '&[data-state="closed"]': { animation: `${close} 30ms ease-out` },
  },
});

export const input = style({
  display: 'block',
  marginBottom: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: 3,
  backgroundColor: '#fff',
  boxShadow: 'inset 0 0 0 2px #0079bf',
  border: 'none',
  width: '100%',
});
