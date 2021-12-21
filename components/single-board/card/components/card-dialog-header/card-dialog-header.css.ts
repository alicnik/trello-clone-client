import { style } from '@vanilla-extract/css';

export const cardDialogHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
  marginBottom: '2rem',
});

export const cardIcon = style({
  display: 'block',
  backgroundImage: 'url("/images/icons/card-icon.png")',
  backgroundSize: 'cover',
  height: 15,
  width: 20,
  marginTop: '0.75rem',
});

export const titleContainer = style({
  marginRight: '1rem',
  flex: 1,
});

export const cardDialogTitle = style({
  resize: 'none',
  border: 'none',
  fontFamily: 'inherit',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontSize: '1.25rem',
  fontWeight: 600,
  padding: '0.5rem 0.5rem 0.25rem',
  width: '100%',

  selectors: {
    '&:focus': {
      backgroundColor: '#fff',
      boxShadow: 'inset 0 0 0 2px #0079bf',
    },
  },
});

export const listSubHeading = style({
  color: '#5e6c84',
  paddingLeft: '0.6rem',
  fontSize: '0.85rem',
});

export const closeIcon = style({
  cursor: 'pointer',
  padding: '0.6rem',
  borderRadius: '50%',
  color: '#42526e',
  transition: 'background-color 85ms',
  height: 37,
  width: 37,

  selectors: {
    '&:hover': {
      backgroundColor: '#091e4214',
    },
  },
});

export const deleteIcon = style({
  cursor: 'pointer',
  padding: '0.675rem',
  borderRadius: '50%',
  color: '#42526e',
  transition: 'background-color 85ms',
  height: 37,
  width: 37,

  selectors: {
    '&:hover': {
      backgroundColor: '#091e4214',
    },
  },
});
