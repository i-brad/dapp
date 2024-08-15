'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';
export function Providers({ children }) {
  return (
      <CacheProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
  );
}
