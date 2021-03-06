import { keyframes, style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: '#fff',
  borderRadius: 3,
  boxShadow: '0 1px 0 #091e4240',
  cursor: 'pointer !important',
  maxWidth: 300,
  minHeight: 20,
  padding: '0.5rem',
  fontSize: '0.8rem',
  marginBottom: '0.5rem',
  lineHeight: '1.25rem',
  overflow: 'hidden',
  wordWrap: 'break-word',
  color: '#172b4d',
});

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    // transform: 'translate(-50%, -48%) scale(.96)',
  },
  '100%': {
    opacity: 1,
    // transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const overlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  animation: `${overlayShow} 100ms cubic-bezier(0.16, 1, 0.3, 1)`,
  overflowY: 'auto',
  display: 'flex',
});

export const content = style({
  backgroundColor: '#f4f5f7',
  borderRadius: 3,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  width: '90vw',
  maxWidth: 550,
  minHeight: 500,
  padding: '1rem 1.25rem 1.5rem',
  animation: `${contentShow} 100ms cubic-bezier(0.16, 1, 0.3, 1)`,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
  color: '#172b4d',
  margin: '8rem 0 4rem',
  height: 'min-content',

  selectors: {
    '&:focus': {
      outline: 'none',
    },
  },
});

export const descriptionIcon = style({
  marginLeft: '0.1rem',
  marginRight: '0.75rem',
  color: '#5e6c84',
});

export const commentsIcon = style({
  transform: 'scale(1.2)',
});

export const commentsIconContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  fontSize: '0.7rem',
  color: '#5e6c84',
  transform: 'translateY(-1px)',
  marginLeft: '0.15rem',
});
