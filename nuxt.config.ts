// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    meta: {
        titleTemplate: 'Sergio Rodriguez | Portfolio',
        link: [
            { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@700,400&display=swap' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: 'apple-touch-icon.png' },
            { rel: 'icon', sizes: '32x32', href: 'favicon-32x32.png' },
            { rel: 'icon', sizes: '16x16', href: 'favicon-16x16.png' },
            { rel: 'manifest', href: 'site.webmanifest' },
        ],
        htmlAttrs: { lang: 'es' },
        meta: [
            { name: 'msapplication-TileColor', content: '#DEDDD9' },
            { name: 'theme-color', content: '#ffffff' },
        ]
    },
    css: [
        'assets/style.css',
    ],
    runtimeConfig: {
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
            isDev: process.env.NODE_ENV !== 'production',
        }
    }
})
