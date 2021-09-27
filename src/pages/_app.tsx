import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '~/config/firebase';
import { Hooks } from '~/hooks';
import { theme } from '~/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Hooks>
        <Component {...pageProps} />
      </Hooks>
    </ChakraProvider>
  );
}

export default MyApp;
