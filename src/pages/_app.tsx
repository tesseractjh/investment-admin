import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@styles/GlobalStyles';
import theme from '@styles/theme';
import '@styles/globals.css';
import useAxiosInterceptors from '@hooks/useAxiosInterceptors';
import ModalProvider from 'src/contexts/ModalProvider';
import Layout from '@components/common/Layout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ModalProvider>
            <AxiosWrapper>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AxiosWrapper>
          </ModalProvider>
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function AxiosWrapper({ children }: Props) {
  useAxiosInterceptors();
  return <>{children}</>;
}
