import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React, { FC, Fragment } from 'react';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import Login from './login';
import Head from 'next/head';
import { BrowserView, MobileView } from 'react-device-detect';
import { MdPhoneAndroid } from 'react-icons/md';
import theme from '../utils/themes';
import Loader from '../components/Loader';

const MainContent = (props: {
    isLoggedIn: boolean;
    Children: { Component: any; pageProps: any };
}) => {
    const isLoggedIn = props.isLoggedIn;
    const { Component, pageProps } = props.Children;
    if (isLoggedIn)
        return (
            <>
                <Component {...pageProps} />
                <Footer />
            </>
        );
    else return <Login />;
};

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem('login')) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
        setLoading(false);
    });
    return (
        <Fragment>
            <Head>
                <title>Sp/it</title>
                <meta name="description" content="sp/it webapp" />
                <link rel="icon" href="/favicon.png" />
                <link
                    rel="preconnect"
                    href="http://fonts.googleapis.com"
                ></link>
            </Head>
            {loading ? (
                <Loader />
            ) : !isLoggedIn ? (
                <Login />
            ) : (
                <Fragment>
                    <MobileView>
                        <MainContent
                            isLoggedIn={isLoggedIn}
                            Children={{
                                Component: Component,
                                pageProps: pageProps,
                            }}
                        />
                    </MobileView>
                    <BrowserView>
                        <main className="container">
                            <MdPhoneAndroid size="60px" color={theme.head} />
                            <br />
                            <h1>Only mobile phones allowed.</h1>
                            <strong>or</strong>
                            <h3>
                                Toggle to MobileView using DevTools and refresh!
                            </h3>
                        </main>
                    </BrowserView>
                    <noscript>
                        This page needs javascript for it to function.
                    </noscript>
                </Fragment>
            )}
        </Fragment>
    );
}

export default MyApp;
