import { style } from '@vanilla-extract/css';

export const quoteContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.75rem',
  alignContent: 'space-between',
  minWidth: '100%',
  paddingLeft: '4rem',
});

export const quote = style({
  position: 'relative',
  fontSize: '2.25rem',
  lineHeight: 1.34,

  selectors: {
    '&::before': {
      position: 'absolute',
      top: '0.9rem',
      left: '-4rem',
      backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' height='31' viewBox='0 0 33 31' width='33' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m32.4 24.1002c0-3.7-2.5-6-6.3-6h-2c.3-7.2 4.1-10.5 8.8-11.30001v-6.599995c-9.3.999995-14.3 7.499995-14.3 18.400005 0 8.6 2.9 11.7 7.5 11.7 3.9 0 6.3-2.7 6.3-6.2zm-18.5 0c0-3.7-2.5-6-6.29999-6h-2c.3-7.2 4.1-10.5 8.79999-11.30001v-6.599995c-9.29999.999995-14.299994 7.499995-14.299994 18.400005 0 8.6 2.900004 11.7 7.500004 11.7 3.89999 0 6.29999-2.7 6.29999-6.2z' fill='%2300a3bf'/%3E%3C/svg%3E")`,
      content: '',
      display: 'inline-block',
      height: 31,
      width: 33,
    },
  },
});

export const attributionContainer = style({
  flex: 1,
});

export const attributionName = style({
  fontWeight: 'bolder',
  fontSize: '1rem',
  textTransform: 'uppercase',
});

export const caption = style({
  display: 'flex',
});

export const industry = style({
  fontWeight: 'bold',
});
