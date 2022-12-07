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
    startupTitle.value.innerHTML = titleWords.map(word => `<span class="startup__title-outer"><span class="startup__title-inner">${word}</span></span>`).join(' ')

    gsap.registerPlugin(TextPlugin);
    console.log('Startup animations: ✨')

    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out',
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
        duration: 2,
    }).from('.startup__title-inner', {
        opacity: 0,
        yPercent: 100,
        stagger: .5,
        duration: 1,
        ease: 'power4',
    }, '<').fromTo('.startup__typing1', {
        text: " ",
    }, {
        text: "Desarrollador",
        boxShadow: 'var(--border-width) 0 0 0 var(--caret-color)',
        duration: "Desarrollador".length * .1,
        ease: "power1.in"
    }, '>').set('.startup__typing1', {
        boxShadow: 'none',
    }).fromTo('.startup__typing2', {
        text: " ",
    }, {
        text: "web",
        boxShadow: 'var(--border-width) 0 0 0 var(--caret-color)',
        duration: "web".length * .1,
        ease: "power1.in"
    }).set('.startup__typing2', {
        boxShadow: 'none',
    }, '+=.5').set('.startup__typing1', {
        boxShadow: 'var(--border-width) 0 0 0 var(--caret-color)',
    }).to('.startup__typing1', {
        backgroundColor: 'var(--selection-color)',
    }, '+=.5').set('.startup__typing1', {
        boxShadow: 'calc(-1 * var(--border-width)) 0 0 0 var(--caret-color)',
    }, '<').fromTo('.startup__typing1', {
        text: " ",
        backgroundColor: 'transparent',
        color: 'inherit',
        boxShadow: 'var(--border-width) 0 0 0 var(--caret-color)',
    }, {
        text: "Diseñador y desarrollador",
        duration: "Diseñador y desarrollador".length * .1,
        ease: "power1.inOut"
    }, '+=.2').set('.startup__typing1', {
        boxShadow: 'none',
    }).set(document.body, {
        overflow: 'auto',
        onComplete() {
            startupFinished.value = true
            gsap.matchMediaRefresh()
            jumpToSlider()
        }
    })
})

function jumpToSlider() {
    gsap.to(window, {
        duration: 1,
        ease: 'power4.out',
        scrollTo: '.hero',
    });
}
</script>

<template>
    <div class="startup" ref="startup">
        <div class="startup__content">
            <h1 class="startup__title" ref="startupTitle">Sergio Rodriguez</h1>
            <h2 class="startup__subtitle" ref="startupSubtitle">&nbsp;<span class="startup__typing1">Diseñador y
                    desarrollador</span> <span class="startup__typing2">web</span></h2>
        </div>
        <div class="startup__loader">
            <Transition name="slide-up">
                <AppFakeButtonSecondary v-if="!startupFinished" style="box-shadow: none;">
                    <AppLoader />
                </AppFakeButtonSecondary>
                <AppButton v-else :icon="ArrowDownIcon" @click="jumpToSlider" aria-label="Ir a proyectos" />
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

.startup__title-outer {
    display: inline-flex;
    overflow: hidden;
}

.startup__title-inner {
    display: inline-block;
}

.startup__subtitle {
    opacity: 0;
    font-size: 1.5rem;
    font-weight: normal;
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
    scale: .5;
    rotate: -90deg;
}

.slide-up-leave-to {
    opacity: 0;
    scale: .5;
    rotate: 90deg;
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