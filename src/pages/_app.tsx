import Layout from '@/components/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps, router }: AppProps) {
    if ([`/login`].includes(router.pathname))
      return <Component {...pageProps} />;
      
    return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    )
  
}
