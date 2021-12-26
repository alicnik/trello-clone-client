import { style, keyframes } from '@vanilla-extract/css';

// CREATE BOARD DIALOG

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const overlay = style({
  backgroundColor: 'rgba(60, 60, 60, 0.95)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 100,
});

export const content = style({
  backgroundColor: 'transparent',
  borderRadius: 6,
  // boxShadow:
  //   'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '1%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '0.5rem',
  zIndex: 110,
});

export const dialogContentContainer = style({
  display: 'flex',
  gap: '0.5rem',
});

export const titleInputContainer = style({
  height: 100,
  width: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
  borderRadius: 3,
  padding: '0.6rem 0.9rem',
});

export const titleInputBackdrop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: '0.5rem',
});

export const titleInput = style({
  outline: 'none',
  border: 'none',
  padding: '0.5rem',
  width: '80%',
  borderRadius: 3,
  background: 'none',
  caretColor: '#fff',
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 'bold',

  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&:focus:not(:hover)': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '1.1rem',
      transform: 'translate(2px, 2px)',
    },
  },
});

export const backgroundChoices = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.5rem',
});

export const backgroundThumbnail = style({
  height: 28,
  width: 28,
  borderRadius: 3,
  border: 'none',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  cursor: 'pointer',
  position: 'relative',

  selectors: {
    '&:hover::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  },
});

export const chosenBackground = style({
  position: 'relative',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    '&::after': {
      position: 'absolute',
      content: 'url("/images/icons/tick.svg")',
      color: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
    },
  },
});

export const closeIcon = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  color: '#fff',
  cursor: 'pointer',
});

export const createBoardButton = style({
  cursor: 'pointer',
  backgroundColor: '#0079bf',
  border: 'none',
  color: '#fff',
  marginTop: '0.5rem',
  fontSize: '0.95rem',
  fontWeight: 400,
  padding: '0.5rem 0.75rem',
  borderRadius: 3,
  minWidth: 113,
});

export const buttonDisabled = style({
  backgroundColor: '#F4F5F7',
  color: '#a5adba',
  cursor: 'not-allowed',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinner = style({
  animation: `1.6s infinite ${spin} ease-in-out`,
});
