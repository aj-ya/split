import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#75e6da" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    {/* this sets the color of url bar in Apple smatphones --> */}
                    <meta
                        name="apple-mobile-web-app-status-bar"
                        content="#75e6da"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
