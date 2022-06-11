import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import Login from './login';
import Head from 'next/head';
import { BrowserView, MobileView } from 'react-device-detect';
import { MdPhoneAndroid } from 'react-icons/md';
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
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/favicon.png" />
                    {/* <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/12.9__iPad_Pro_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/10.5__iPad_Air_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/10.2__iPad_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/iPhone_11__iPhone_XR_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/12.9__iPad_Pro_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/10.5__iPad_Air_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/10.2__iPad_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/iPhone_11__iPhone_XR_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                    /> */}
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
                        <strong>or</strong>
                        <h3>
                            Toggle to MobileView using DevTools and refresh!
                        </h3>
                    </main>
                </BrowserView>
            </Fragment>
        );
    }
}

export default MyApp;
