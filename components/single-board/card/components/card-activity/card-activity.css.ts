import { style } from '@vanilla-extract/css';

export const container = style({
  width: '87.5%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  margin: '1rem 0 0.75rem',
});

export const commentContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
});

export const icon = style({
  marginRight: '1.25rem',
  transform: 'scale(1.4) translateX(2px)',
  color: '#42536e',
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
  padding: 0,
  overflow: 'hidden',
  position: 'relative',

  selectors: {
    '&:hover:not(:focus-within)': {
      boxShadow: '0 1px 1px #091e4240, 0 0 0 1px #091e4214',
    },
    '&:focus-within': {
      boxShadow: '0 4px 8px -2px #091e4240, 0 0 0 1px #091e4214',
      padding: '0.75rem 0.75rem 3.3rem',
    },
  },
});

export const textArea = style({
  width: '100%',
  border: 'none',
  resize: 'none',
  padding: '0.75rem 0.75rem 0',
  lineHeight: 0.8,
  outline: 'none',
  fontFamily: 'inherit',
  color: 'inherit',

  selectors: {
    '&:focus': {
      padding: 0,
    },
  },
});

export const controls = style({
  position: 'absolute',
  top: 46,
  left: 12,
});


