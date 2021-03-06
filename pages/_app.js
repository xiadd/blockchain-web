import React, { useEffect } from 'react';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import './global.css'

export default function App(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.getElementById('mantine-ssr-styles');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>blockchain web</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          // colorScheme: 'dark',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
