<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const startupFinished = useStartupFinished()
const footerVisible = useFooterVisible()
const headerTheme = useHeaderTheme()
const currentNavItem = ref(-1)
const header = ref(null)

onMounted(() => {
    [document.querySelector('.hero'), document.querySelector('.habilidades'), document.querySelector('.experiencia')].forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'center top',
            onEnter() {
                currentNavItem.value = i
            },
            onLeaveBack() {
                currentNavItem.value = i - 1
            },
        })
    });
})

function goToSection(selector, margin = 0) {
    const offsetTop = document.querySelector(selector).offsetTop
    gsap.to(window, {
        duration: 1 + (Math.abs(offsetTop - window.scrollY) / window.innerHeight / 2),
        ease: 'power4.out',
        scrollTo: offsetTop - margin
    });
}

function goToFooter() {
    const offsetTop = document.body.scrollHeight
    gsap.to(window, {
        duration: 1 + (Math.abs(offsetTop - window.scrollY) / window.innerHeight / 2),
        ease: 'power4.out',
        scrollTo: offsetTop
    });
}
</script>

<template>
    <Transition name="header--animation">
        <header class="header" v-show="(startupFinished && !footerVisible)" ref="header">
            <nav class="nav">
                <ul class="nav__list" :class="[headerTheme ? `nav__list--${headerTheme}` : '']">
                    <li class="nav__item" :class="{ 'nav__item--active': currentNavItem == 0 }">
                        <NuxtLink to="javascript:void(0)" @click="goToSection('.pin-spacer', -50)">Proyectos</NuxtLink>
                    </li>
                    <li class="nav__item" :class="{ 'nav__item--active': currentNavItem == 1 }">
                        <NuxtLink to="javascript:void(0)" @click="goToSection('.habilidades', 100)">Habilidades</NuxtLink>
                    </li>
                    <li class="nav__item" :class="{ 'nav__item--active': currentNavItem == 2 }">
                        <NuxtLink to="javascript:void(0)" @click="goToSection('.experiencia', 100)">Experiencia</NuxtLink>
                    </li>
                </ul>
                <AppLinkSecondary to="javascript:void(0)" :theme="headerTheme" target="" @click="goToFooter">Contáctame
                </AppLinkSecondary>
            </nav>
        </header>
    </Transition>
</template>

<style>
.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 1rem 2rem;
    z-index: 999;
    transition-property: transform, opacity;
    transition-duration: .5s;
}

.header--animation-enter-active,
.header--animation-leave-active {
    transition-duration: 1s;
}

.header--animation-enter-from,
.header--animation-leave-to {
    transform: translateY(-100%);
    opacity: 1;
}

.nav {
    border-radius: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

.nav__list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 2rem;
}

.nav__list--dark {
    color: var(--base-color);
}

.nav__item a {
    text-decoration: none;
    opacity: .5;
    transition: opacity .2s, color .5s;
}

.nav__item a:where(:hover, :focus) {
    opacity: 1;
}

.nav__item--active a {
    opacity: 1;
    text-decoration: underline;
    font-weight: bold;
}

@media (max-width: 768px) {
    .header {
        display: none;
    }
}
</style>