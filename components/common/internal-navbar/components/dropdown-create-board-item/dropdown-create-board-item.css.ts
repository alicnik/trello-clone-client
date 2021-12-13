import { style } from '@vanilla-extract/css';

export const boardPreview = style({
  height: 120,
  width: 200,
  borderRadius: 3,
  boxShadow: '0 7px 15px rgb(0 0 0 / 15%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  margin: '0 auto 1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const previewOverlay = style({
  height: '90%',
  width: '90%',
  backgroundImage: 'url("/images/preview-skeleton.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const subheading = style({
  color: '#5e6c84',
  fontSize: '0.75rem',
  fontWeight: 700,
  marginBottom: '0.25rem',
  lineHeight: '1rem',
});

export const thumbnailContainer = style({
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
});

const thumbnail = style({
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
});

export const unsplashThumbnail = style([
  thumbnail,
  {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 64,
    height: 40,
  },
]);

export const colourThumbnail = style([
  thumbnail,
  {
    width: 40,
    height: 30,
  },
]);

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

export const ellipsisIcon = style({
  position: 'relative',
  top: 2,
  left: 0.5,
  transform: 'scale(1.2)',
});

export const boardTitleLabel = style({
  marginTop: '1rem',
  display: 'block',

  selectors: {
    '&::after': {
      content: '*',
      color: '#eb5a46',
      marginLeft: 2,
    },
  },
});

export const boardTitleInput = style({
  padding: '0.5rem 0.75rem',
  width: '100%',
  color: '#172b4d',
  backgroundColor: '#fafbfc',
  border: 'none',
  transitionProperty: 'background-color, border-color, box-shadow',
  transitionDuration: '85md',
  transitionTimingFunction: 'ease',
  borderRadius: 3,
  boxShadow: 'inset 0 0 0 2px #dfe1e6',
  lineHeight: '1.25rem',

  selectors: {
    '&:hover': {
      backgroundColor: '#ebecf0',
      boxShadow: 'inset 0 0 0 2px #dfe1e6',
    },
    '&:focus': {
      backgroundColor: '#ffffff',
      boxShadow: 'inset 0 0 0 2px #0079bf',
    },
  },
});

export const error = style({
  color: '#172b4d',
  fontSize: '0.875rem',
});

export const errorEmoji = style({
  marginRight: 3,
});

export const submitButton = style({
  width: '100%',
  marginTop: '1rem',
  border: 'none',
  padding: '0.5rem',
  backgroundColor: '#0079bf',
  borderRadius: 3,
  color: '#ffffff',
  cursor:'pointer',

  selectors: {
    '&:disabled': {
      backgroundColor: 'rgba(9, 30, 66, 0.04)',
      color: '#a5adba',
      cursor: 'not-allowed',
    },
  },
});
