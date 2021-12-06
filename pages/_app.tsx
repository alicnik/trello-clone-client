import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IdProvider } from '@radix-ui/react-id';

import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </IdProvider>
  );
}
export default MyApp;
