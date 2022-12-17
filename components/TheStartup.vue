<script setup>
import { ArrowDownIcon } from '@heroicons/vue/24/outline'
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const startupFinished = useStartupFinished()
const startup = ref(null)
const startupTitle = ref(null)
const startupSubtitle = ref(null)

onMounted(() => {
    const titleWords = startupTitle.value.textContent.split(' ')
    const subtitleWords = startupSubtitle.value.textContent.split(' ')
    startupTitle.value.innerHTML = titleWords.map(word => `<span class="startup__title-outer"><span class="startup__title-inner">${word}</span></span>`).join(' ')
    startupSubtitle.value.innerHTML = subtitleWords.map(word => `<span class="startup__subtitle-outer"><span class="startup__subtitle-inner">${word}</span></span>`).join(' ')

    gsap.registerPlugin(TextPlugin);
    console.log('Startup animations: ✨')

    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out',
            duration: 1,
        }
    })

    tl.set(document.body, {
        overflow: 'hidden',
        onComplete() {
            gsap.to(window, {
                duration: 0,
                scrollTo: 0,
            });
        }
    }, '+=.5').set(startupTitle.value, {
        opacity: 1
    }, '<').set(startupSubtitle.value, {
        opacity: 1
    }, '<').from(startupTitle.value, {
        scale: .5,
        duration: 1.5,
    }, '<').fromTo('.startup__title-inner', {
        opacity: 0,
        yPercent: 100,
    }, {
        opacity: 1,
        yPercent: 0,
        stagger: .2,
        ease: 'power3',
    }, '<').fromTo('.startup__subtitle-inner', {
        opacity: 0,
        yPercent: 100,
    }, {
        opacity: 1,
        yPercent: 0,
        stagger: .2,
        ease: 'power3',
    }).set(document.body, {
        overflow: 'auto',
        onComplete() {
            startupFinished.value = true
            gsap.matchMediaRefresh()
            jumpToSlider()
        }
    }, '+=1')
})

function jumpToSlider() {
    gsap.to(window, {
        duration: 1,
        ease: 'power2.inOut',
        scrollTo: '.hero',
    });
}
</script>

<template>
    <div class="startup" ref="startup">
        <div class="startup__content">
            <h1 class="startup__title" ref="startupTitle">Sergio Rodriguez</h1>
            <h2 class="startup__subtitle" ref="startupSubtitle">Diseñador y desarrollador web</h2>
        </div>
        <div class="startup__loader">
            <Transition name="slide-up">
                <AppFakeButtonSecondary v-if="!startupFinished" style="box-shadow: none;">
                    <AppLoader />
                </AppFakeButtonSecondary>
                <AppButton v-else :icon="ArrowDownIcon" @click="jumpToSlider">Ver proyectos</AppButton>
            </Transition>
        </div>
    </div>
</template>

<style>
.startup {
    width: 100%;
    height: 100vh;
    background-color: var(--base-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: center;
}

.startup__content {
    height: 100%;
    padding: 2rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.startup__loader {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.startup__title {
    opacity: 0;
    font-size: 8rem;
    width: 5em;
    overflow: hidden;
}

.startup__title-outer, .startup__subtitle-outer {
    display: inline-flex;
    overflow: hidden;
}

.startup__title-inner, .startup__subtitle-inner {
    display: inline-block;
}

.startup__subtitle {
    opacity: 0;
    font-size: 1.5rem;
    font-weight: normal;
    overflow: hidden;
}

.slide-up-enter-active,
.slide-up-leave-active {
    position: relative;
    transition-property: opacity, scale, rotate !important;
    transition: .2s !important;
    z-index: 1;
}

.slide-up-leave-active {
    position: absolute;
    z-index: 0;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(100%);
}

.slide-up-leave-to {
    opacity: 0;
    scale: 0;
}

@media (max-width: 768px) {
    .startup__title {
        font-size: 3rem;
    }

    .startup__subtitle {
        font-size: 1rem;
    }
}
</style>