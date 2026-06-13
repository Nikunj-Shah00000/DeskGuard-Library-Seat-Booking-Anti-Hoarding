import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      brown: '#4E342E',
      earthGreen: '#556B2F',
      forestGreen: '#3F5D3F',
      yellow: '#F4B400',
      red: '#B23A48',
      beige: '#F5E9DA',
      cream: '#FAF4EC',
      lightBeige: '#FDF8F2',
    },
  },
  fonts: {
    heading: `'Inter', 'Helvetica Neue', sans-serif`,
    body: `'Inter', 'Helvetica Neue', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#FAF4EC',
        color: '#2C1A17',
        overflowX: 'hidden',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::-webkit-scrollbar': {
        width: '4px',
      },
      '::-webkit-scrollbar-track': {
        background: '#F5E9DA',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#4E342E',
        borderRadius: '2px',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '800',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
    },
  },
});

export default theme;
