/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

console.log(process.env.NODE_ENV === 'development');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        // importScripts: ['/worker/index.js'],
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
    },
});
