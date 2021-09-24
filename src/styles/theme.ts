import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },

  fonts: {
    headings: 'Roboto',
    body: 'Roboto',
  },

  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
