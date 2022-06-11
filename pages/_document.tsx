import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="description" content="sp/it webapp" />
                    <link rel="icon" href="/favicon.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/favicon.png" />
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
