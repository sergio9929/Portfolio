// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    meta: {
        titleTemplate: '%s | Portfolio',
        link: [
            { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@700,400&display=swap' }
        ],
        htmlAttrs: { lang: 'es' },
        meta: [
            { name: 'theme-color', content: '#ffffff' }
        ]
    },
    css: [
        'assets/style.css',
    ],
    router: {
        base: '/Portfolio/'
    }
})
