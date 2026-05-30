import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Font preconnects live here at document level for earliest possible DNS resolution */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts are loaded once in _app.js Head - no duplicate here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
