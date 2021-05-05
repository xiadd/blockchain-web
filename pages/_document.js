import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            crossOrigin="anonymous"
          />
        </Head>
        <body style={{ backgroundColor: '#f5f7fb' }}>
          <div
            className="bg-white border-bottom"
            style={{ height: 60, width: '100%' }}
          >
            <div className="container d-flex align-items-center h-100">
              blockchain
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument