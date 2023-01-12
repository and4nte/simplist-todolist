import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/noto-sans-kr';
import '@fontsource/dongle/korean.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'utils/createEmotionCache';

import AppLayout from 'components/AppLayout';

interface AppPropsWithCache extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithCache) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </CacheProvider>
  );
}

export default MyApp;
