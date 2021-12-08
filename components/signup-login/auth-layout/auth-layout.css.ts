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

export const hr = style({
  width: '100%',
  maxWidth: 585,
  margin: '0.5rem 0',
});
