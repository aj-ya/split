import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import Login from './login';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!localStorage.getItem('login')) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    if (isLoggedIn)
        return (
            <React.Fragment>
                <Head>
                    <title>Sp/it</title>
                    <meta name="description" content="sp/it webapp" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <Component {...pageProps} />
                <Footer />
            </React.Fragment>
        );
    else return <Login />;
}

export default MyApp;
