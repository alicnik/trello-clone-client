import { style, keyframes } from '@vanilla-extract/css';

export const boardCard = style({
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: 3,
  height: 100,
  width: 200,
  color: '#fff',
  position: 'relative',

  selectors: {
    '&:hover': {
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)) !important',
    },
  },
});

export const boardCardTitle = style({
  fontSize: '1.15rem',
  zIndex: 1,
  marginBottom: '0.8rem',
});

export const createBoardCard = style({
  backgroundColor: '#091e420a',
  color: '#172b4d',
  fontWeight: 400,
  fontSize: 14,
});

export const createBoardText = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  textAlign: 'center',
});

export const favourite = style({
  position: 'absolute',
  bottom: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
});

// DIALOG

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const overlay = style({
  backgroundColor: 'rgba(60, 60, 60, 0.95)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
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
});

export const buttonDisabled = style({
  backgroundColor: '#F4F5F7',
  color: '#a5adba',
  cursor: 'not-allowed',
});
