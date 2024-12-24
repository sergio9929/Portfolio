<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const startupFinished = useStartupFinished()
const startup = ref(null)
const startupTitle = ref(null)
const startupSubtitle = ref(null)

onMounted(() => {
    const titleWords = startupTitle.value.textContent.split(' ')
    const subtitleWords = startupSubtitle.value.textContent.split(' ')
    startupTitle.value.innerHTML = titleWords.map(word => `<span class="startup__title-outer"><span class="startup__title-inner">${word}</span></span>`).join(' ')
    startupSubtitle.value.innerHTML = subtitleWords.map(word => `<span class="startup__subtitle-outer"><span class="startup__subtitle-inner">${word}</span></span>`).join(' ')

    console.log('Startup animations: ✨')

    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out',
            duration: 1,
        }
    })

    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: 769px)`,
        isMobile: `(max-width: 768px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        if (isDesktop) {

        }

        tl.set(document.body, {
            overflow: 'hidden',
            onComplete() {
                gsap.to(window, {
                    duration: 0,
                    scrollTo: 0,
                });
            }
        }).set(startupTitle.value, {
            opacity: 1
        }, '<').set(startupSubtitle.value, {
            opacity: 1,
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
            onComplete() {
                startupFinished.value = true
            }
        }, '-=.5').to(startup.value, {
            height: isDesktop ? '90vh' : '60vh',
        }, '-=.5').set(document.body, {
            overflow: 'auto',
            onComplete() {
                ScrollTrigger.refresh()
            }
        })
    })
})
</script>

<template>
    <div class="startup" ref="startup">
        <div class="startup__content">
            <h1 class="startup__title" ref="startupTitle">Sergio Rodriguez</h1>
            <h2 class="startup__subtitle" ref="startupSubtitle">Diseñador y desarrollador web</h2>
        </div>
    </div>
</template>

<style>
.startup {
    width: 100%;
    height: 100vh;
    min-height: 30rem;
    background-color: var(--base-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: center;
    text-transform: uppercase;
}

.startup__content {
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
    font-size: 13rem;
    line-height: .9;
    margin-bottom: 2rem;
    /* width: 9ch; */
    overflow: hidden;
}

.startup__title-outer,
.startup__subtitle-outer {
    display: inline-flex;
    overflow: hidden;
}

.startup__title-inner,
.startup__subtitle-inner {
    display: inline-block;
}

.startup__subtitle {
    opacity: 0;
    font-size: 2rem;
    line-height: 1;
    margin-bottom: 0;
    font-weight: normal;
    overflow: hidden;

    width: 100%;
    max-width: 75rem;
    display: flex;
    justify-content: space-between;
    gap: .5em;
    flex-wrap: wrap;
}

@media screen and (max-width: 1280px) {
    .startup {
        min-height: 40vw;
    }

    .startup__title {
        font-size: 16vw;
    }
}

@media (max-width: 768px) {
    .startup__content {
        padding-bottom: 1rem;
    }

    .startup__title {
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    .startup__subtitle {
        font-size: 1rem;
    }
}
</style>