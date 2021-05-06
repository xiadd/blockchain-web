import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Container } from '@mantine/core'
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="mantine-ssr-styles">{registry.toString()}</style>
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>blockchain-web</title>
        </Head>
        <body style={{ backgroundColor: '#fafafa' }}>
          <div
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#fff',
              margin: -8, width: 'calc(100% + 16px)',
              marginBottom: 10,
              borderBottom: '1px solid #efefef'
            }}
          >
            <div
              style={{
                display: 'flex',
                height: 60,
                alignItems: 'center',
                padding: '0 20px'
              }}
            >
              Contact me: xiadd0102@gmail.com
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
