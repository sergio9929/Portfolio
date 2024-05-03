<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

definePageMeta({
    title: 'Home',
})

useHead({
    title: 'Sergio Rodriguez',
})

const router = useRouter()
const footerVisible = useFooterVisible()
const container = ref(null)

onMounted(() => {
    for (const element of [...document.querySelectorAll('.table__row'), ...document.querySelectorAll('.section__title')]) {
        gsap.from(element, {
            opacity: 0,
            y: 100,
            scrollTrigger: {
                trigger: element,
                scrub: 1,
                start: 'top 100%',
                end: 'bottom 80%',
                refreshPriority: -1,
            }
        });
    }
})

</script>

<template>
    <div class="container" :class="{ 'container--footer-visible': footerVisible }" ref="container">
        <TheStartup />
        <TheHero />
        <SectionHabilidades />
        <SectionExperiencia />
        <SectionIdiomas />
    </div>
</template>

<style>
.container {
    transition: transform .2s;
    transform-origin: bottom;
}

.container--footer-visible {
    transform: scale(.9);
}

.footer__title {
    font-size: 3rem;
}

@media (max-width: 768px) {
    .container--footer-visible {
        transform: none;
    }
}
</style>