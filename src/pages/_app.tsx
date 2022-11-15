import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from '@styles/GlobalStyles';
import theme from '@styles/theme';
import '@styles/globals.css';
import useAxiosInterceptors from '@hooks/useAxiosInterceptors';
import ModalProvider from 'src/contexts/ModalProvider';
import { useRouter } from 'next/router';
import Layout from '@components/common/Layout';

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
        <ModalProvider>
          <AxiosWrapper>
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </AxiosWrapper>
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function AxiosWrapper({ children }: Props) {
  useAxiosInterceptors();
  return <>{children}</>;
}

function LayoutWrapper({ children }: Props) {
  const { pathname } = useRouter();
  if (pathname === '/login') {
    return <>{children}</>;
  }
  return <Layout>{children}</Layout>;
}
