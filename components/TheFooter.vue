<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

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
            <AppLinkSecondary theme="dark" to="mailto:sergio9929@hotmail.com">sergio9929@hotmail.com</AppLinkSecondary>
            <AppLinkSecondary theme="dark" to="tel:+34622593344">622 59 33 44</AppLinkSecondary>
            <AppLinkSecondary theme="dark" to="Sergio Rodriguez CV.pdf" :icon="DocumentTextIcon">Descargar CV</AppLinkSecondary>
            <AppFakeButtonSecondary theme="dark">España > Vizcaya > Durango</AppFakeButtonSecondary>
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
    transform: translateY(-2rem);

    transition: transform .2s;
}

.footer--footer-visible {
    transform: translateY(0)
}

.footer .section {
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>