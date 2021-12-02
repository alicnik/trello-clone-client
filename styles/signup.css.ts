import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '100%',
  backgroundColor: '#F9FAFC',
});

export const header = style({
  padding: '2rem',
});

export const main = style({
  marginBottom: 'auto',
});

export const backgroundImage = style({
  flexGrow: 1,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom',
  minWidth: 350,
  maxWidth: 400,
});

export const content = style({
  flexGrow: 2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontFamily:
    '"-apple-system",BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;',
});

export const form = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#FFF',
  borderRadius: 3,
  padding: '1.5rem 3rem',
  maxWidth: 585,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const formHeading = style({
  color: '#5E6C84',
  fontSize: '1rem',
  padding: '0.5rem 0',
});

export const legal = style({
  alignSelf: 'flex-start',
  textAlign: 'left',
  fontSize: '0.75rem',
  color: '#5E6C84',
  lineHeight: '1rem',
});

export const hr = style({
  width: '100%',
  maxWidth: 585,
  margin: '0.5rem 0',
});

export const input = style({
  width: '100%',
  fontSize: '0.85rem',
  padding: '0.5rem 0.5rem',
});

export const button = style({
  width: '100%',
  border: 'none',
  padding: '0.5rem 0',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  borderRadius: 4,
  color: '#fff',
  backgroundColor: '#5AAC44',
  cursor: 'pointer',

  selectors: {
    '&[disabled]': {
      color: 'hsl(0,0%,55%)',
      backgroundColor: '#E2E4E6',
      cursor: 'default',
    },
  },
});

export const link = style({
  color: '#0052CC',
  fontSize: '0.85rem',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
