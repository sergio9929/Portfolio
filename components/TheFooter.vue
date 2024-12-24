<script setup>
const footerVisible = useFooterVisible()

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                footerVisible.value = true
            } else {
                footerVisible.value = false
            }
        })
    }, {
        threshold: 0,
    })

    observer.observe(document.getElementById('footer-observer'))
})
</script>

<template>
    <footer class="footer" :class="{ 'footer--footer-visible': footerVisible }">
        <AppSection>
            <h2 class="footer__title">Recursos</h2>
            <div class="footer__buttons">
                <AppLinkSecondary theme="dark" to="Sergio Rodriguez CV.pdf" icon="heroicons:document-text">Descargar CV
                </AppLinkSecondary>
                <AppLinkSecondary theme="dark" to="https://github.com/sergio9929/Portfolio"
                    icon="heroicons:command-line">
                    Código fuente </AppLinkSecondary>
                <AppLinkSecondary theme="dark" to="https://github.com/sergio9929" icon="simple-icons:github">Github
                </AppLinkSecondary>
                <AppLinkSecondary theme="dark" to="https://dribbble.com/sergio9929" icon="simple-icons:dribbble">
                    Dribbble
                </AppLinkSecondary>
            </div>
        </AppSection>

        <AppSection class="contacto">
            <h2 class="footer__title">Contacto</h2>
            <div class="footer__buttons">
                <AppLinkSecondary theme="dark" to="mailto:sergio9929@hotmail.com">sergio9929@hotmail.com
                </AppLinkSecondary>
                <AppLinkSecondary theme="dark" to="tel:+34622593344">622 59 33 44</AppLinkSecondary>
                <AppFakeButtonSecondary theme="dark">España > Vizcaya > Durango</AppFakeButtonSecondary>
            </div>
        </AppSection>
    </footer>
</template>

<style>
.footer {
    color: var(--base-color);
    display: flex;
    flex-direction: column;
    align-items: center;

    position: sticky;
    bottom: 0;
    z-index: 0;
    padding-block: 2rem;
}

.footer--footer-visible {
    transform: translateY(0)
}

.footer .section {
    margin: 0;
}

.footer__buttons {
    display: flex;
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 1rem;
}
</style>