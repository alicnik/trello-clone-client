import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IdProvider } from '@radix-ui/react-id';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <IdProvider>
          <Component {...pageProps} />
        </IdProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
