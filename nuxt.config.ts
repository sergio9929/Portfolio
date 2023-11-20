// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: [
        '@nuxt/image',
        'nuxt-gtag',
        'nuxt-icon',
    ],
    image: {
        screens: {
            mobile: 768,
            laptop: 1280,
            desktop: 1920,
        },
    },
    app: {
        head: {
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
                { name: 'description', content: 'Soy un apasionado diseñador y desarrollador de aplicaciones y páginas web.' },
                { name: 'msapplication-TileColor', content: '#DEDDD9' },
                { name: 'theme-color', content: '#ffffff' },
                { name: 'robots', content: 'index, follow' },
                { 'http-equiv': 'cache-control', content: 'max-age=86400' },
            ]
        },
    },
    css: [
        'assets/style.css',
    ],
    runtimeConfig: {
        public: {
            isDev: process.env.NODE_ENV !== 'production',
        }
    },
})
