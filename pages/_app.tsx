import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import Login from './login';
import Head from 'next/head';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';
import { MdMobileFriendly, MdPhone, MdPhoneAndroid } from 'react-icons/md';
import { IconContext } from 'react-icons';
import theme from '../utils/themes';
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
    if (!isLoggedIn) return <Login />;
    else {
        return (
            <Fragment>
                <Head>
                    <title>Sp/it</title>
                    <meta name="description" content="sp/it webapp" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <MobileView>
                    <Component {...pageProps} />
                    <Footer />
                </MobileView>
                <BrowserView>
                    <main className="container">
                        <MdPhoneAndroid size="60px" color={theme.head} />
                        <br />
                        <h1>Only mobile phones allowed.</h1>
                    </main>
                </BrowserView>
            </Fragment>
        );
    }
}

export default MyApp;
