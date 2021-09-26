import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { LoadingProvider } from '~/contexts/loading';
import { theme } from '~/styles/theme';

import '~/config/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default MyApp;
